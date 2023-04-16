// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
import { Fragment, useEffect, useMemo, useState } from "react";
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

import { Button, Grid } from "mds";

import Select from "@atlaskit/select";
import { FormControl, InputBase } from "@mui/material";
import { useSelector } from "react-redux";
import { withStyles } from "../../../../theme/makeStyles";

import api from "../../../../../src/common/api";
import { ErrorResponseHandler } from "../../../../../src/common/types";
import { AppState, useAppDispatch } from "../../../../store";

import TableTree, { Row, Rows } from "@atlaskit/table-tree";
import { makeStyles } from "../../../../theme/makeStyles";
import { wsProtocol } from "../../../../utils/wsUtils";
import {
  actionsTray,
  containerForHeader,
  inlineCheckboxes,
  searchField,
} from "../../Common/FormComponents/common/styleLibrary";
import PageLayout from "../../Common/Layout/PageLayout";
import PageHeaderWrapper from "../../Common/PageHeaderWrapper/PageHeaderWrapper";
import SearchBox from "../../Common/SearchBox";
import {
  logMessageReceived,
  logResetMessages,
  setLogsStarted,
} from "../logsSlice";
import { LogMessage } from "../types";
import LogLine from "./LogLine";

const useStyles = makeStyles()((theme) => ({
  logList: {
    background: "#fff",
    minHeight: 400,
    height: "calc(100vh - 200px)",
    overflow: "auto",
    fontSize: 13,
    borderRadius: 4,
  },
  logerror_tab: {
    color: "#A52A2A",
    paddingLeft: 25,
  },
  nodeField: {
    width: "100%",
  },
  ...actionsTray,
  actionsTray: {
    ...actionsTray.actionsTray,
    marginBottom: 0,
  },
  ...searchField,

  ...inlineCheckboxes,
  ...containerForHeader,
}));

const SelectStyled = withStyles(InputBase, () => ({
  root: {
    lineHeight: "50px",
    "label + &": {
      marginTop: "10px",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "transparent",
    },
  },
}));

var c: any = null;

const ErrorLogs = () => {
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const messages = useSelector((state: AppState) => state.logs.logMessages);
  const logsStarted = useSelector((state: AppState) => state.logs.logsStarted);

  const [filter, setFilter] = useState<string>("");
  const [nodes, setNodes] = useState<string[]>([""]);
  const [selectedNode, setSelectedNode] = useState<string>("all");
  const [selectedUserAgent, setSelectedUserAgent] =
    useState<string>("Select user agent");
  const [userAgents, setUserAgents] = useState<string[]>(["All User Agents"]);
  const [logType, setLogType] = useState<string>("all");
  const [loadingNodes, setLoadingNodes] = useState<boolean>(false);

  const startLogs = () => {
    dispatch(logResetMessages());
    const url = new URL(window.location.toString());
    const isDev = process.env.NODE_ENV === "development";
    const port = isDev ? "9090" : url.port;

    const wsProt = wsProtocol(url.protocol);
    // check if we are using base path, if not this always is `/`
    const baseLocation = new URL(document.baseURI);
    const baseUrl = baseLocation.pathname;

    c = new W3CWebSocket(
      `${wsProt}://${
        url.hostname
      }:${port}${baseUrl}ws/console/?logType=${logType}&node=${
        selectedNode === "Select node" ? "" : selectedNode
      }`
    );
    let interval: any | null = null;
    if (c !== null) {
      c.onopen = () => {
        console.log("WebSocket Client Connected");
        dispatch(setLogsStarted(true));
        c.send("ok");
        interval = setInterval(() => {
          c.send("ok");
        }, 10 * 1000);
      };
      c.onmessage = (message: IMessageEvent) => {
        // console.log(message.data.toString())
        // FORMAT: 00:35:17 UTC 01/01/2021

        let m: any = JSON.parse(message.data.toString());
        let isValidEntry = true;
        if (
          m.level === "" &&
          m.errKind === "" &&
          //@ts-ignore
          m.time === "00:00:00 UTC 01/01/0001" &&
          m.ConsoleMsg === "" &&
          m.node === ""
        ) {
          isValidEntry = false;
        }

        m.key = Math.random();
        if (userAgents.indexOf(m.userAgent) < 0 && m.userAgent !== undefined) {
          userAgents.push(m.userAgent);
          setUserAgents(userAgents);
        }
        if (isValidEntry) {
          dispatch(logMessageReceived(m));
        }
      };
      c.onclose = () => {
        clearInterval(interval);
        console.log("connection closed by server");
        dispatch(setLogsStarted(false));
      };
      return () => {
        c.close(1000);
        clearInterval(interval);
        console.log("closing websockets");
        dispatch(setLogsStarted(false));
      };
    }
  };

  const stopLogs = () => {
    if (c !== null && c !== undefined) {
      c.close(1000);
      dispatch(setLogsStarted(false));
    }
  };

  const filtLow = filter.toLowerCase();
  let filteredMessages = messages.filter((m) => {
    if (
      m.userAgent === selectedUserAgent ||
      selectedUserAgent === "All User Agents" ||
      selectedUserAgent === "Select user agent"
    ) {
      if (filter !== "") {
        if (m.ConsoleMsg.toLowerCase().indexOf(filtLow) >= 0) {
          return true;
        } else if (
          m.error &&
          m.error.source &&
          m.error.source.filter((x) => {
            return x.toLowerCase().indexOf(filtLow) >= 0;
          }).length > 0
        ) {
          return true;
        } else if (
          m.error &&
          m.error.message.toLowerCase().indexOf(filtLow) >= 0
        ) {
          return true;
        } else if (m.api && m.api.name.toLowerCase().indexOf(filtLow) >= 0) {
          return true;
        }
        return false;
      }
      return true;
    } else return false;
  });

  const nodeOptions = useMemo(
    () => [
      { label: "All Nodes", value: "all" },
      ...nodes.map((item) => ({ label: item, value: item })),
    ],
    [nodes]
  );

  const logOptions = useMemo(
    () => [
      { value: "all", label: "All Log Types" },
      { value: "minio", label: "MinIO" },
      { value: "application", label: "Application" },
    ],
    []
  );
  const agentOptions = useMemo(
    () => [
      { label: "Select User Agent", value: selectedUserAgent },
      ...userAgents.map((item) => ({ label: item, value: item })),
    ],
    [selectedUserAgent, userAgents]
  );

  useEffect(() => {
    setLoadingNodes(true);
    api
      .invoke("GET", `/api/v1/nodes`)
      .then((res: string[]) => {
        setNodes(res);
        // if (res.length > 0) {
        //   setSelectedNode(res[0]);
        // }
        setLoadingNodes(false);
      })
      .catch((err: ErrorResponseHandler) => {
        setLoadingNodes(false);
      });
  }, []);

  return (
    <Fragment>
      <PageHeaderWrapper label="Logs" />
      <PageLayout>
        <Grid container rowSpacing={1} columnSpacing={1}>
          <Grid item xs={4}>
            {!loadingNodes ? (
              <FormControl variant="outlined" className={classes.nodeField}>
                <Select
                  id="node"
                  name="node"
                  data-test-id="node-selector"
                  value={nodeOptions.find(
                    (item) => item.value === selectedNode
                  )}
                  onChange={(e) => {
                    setSelectedNode(e?.value as string);
                  }}
                  className={classes.searchField}
                  disabled={loadingNodes || logsStarted}
                  input={<SelectStyled />}
                  placeholder={"Select Node"}
                  options={nodeOptions}
                ></Select>
              </FormControl>
            ) : (
              <h3> Loading nodes</h3>
            )}
          </Grid>

          <Grid item xs={3}>
            <FormControl variant="outlined" className={classes.nodeField}>
              <Select
                id="logType"
                name="logType"
                data-test-id="log-type"
                value={logOptions.find((item) => item.value === logType)}
                onChange={(e) => {
                  setLogType(e?.value as string);
                }}
                className={classes.searchField}
                disabled={loadingNodes || logsStarted}
                input={<SelectStyled />}
                placeholder={"Select Log Type"}
                options={logOptions}
              ></Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            {userAgents.length > 1 && (
              <FormControl variant="outlined" className={classes.nodeField}>
                <Select
                  id="userAgent"
                  name="userAgent"
                  data-test-id="user-agent"
                  value={agentOptions.find(
                    (item) => item.value === selectedUserAgent
                  )}
                  onChange={(e) => {
                    setSelectedUserAgent(e?.value as string);
                  }}
                  className={classes.searchField}
                  disabled={userAgents.length < 1 || logsStarted}
                  input={<SelectStyled />}
                  options={agentOptions}
                ></Select>
              </FormControl>
            )}
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {!logsStarted && (
              <Button
                id={"start-logs"}
                type="submit"
                variant="callAction"
                disabled={false}
                onClick={startLogs}
                label={"Start Logs"}
              />
            )}
            {logsStarted && (
              <Button
                id={"stop-logs"}
                type="button"
                variant="callAction"
                onClick={stopLogs}
                label={"Stop Logs"}
              />
            )}
          </Grid>
          <Grid item xs={12} className={classes.actionsTray}>
            <SearchBox
              placeholder="Filter"
              onChange={(e) => {
                setFilter(e);
              }}
              value={filter}
            />
          </Grid>
          <Grid item xs={12}>
            <div
              id="logs-container"
              className={classes.logList}
              data-test-id="logs-list-container"
            >
              <div style={{ background: "rgb(231, 235, 240)", padding: 24 }}>
                <TableTree>
                  <Rows
                    items={filteredMessages}
                    render={(log: LogMessage) => {
                      return (
                        <Row>
                          <LogLine log={log} />
                        </Row>
                      );
                    }}
                  />
                </TableTree>
                {filteredMessages.length === 0 && (
                  <div style={{ padding: 20, textAlign: "center" }}>
                    No logs to display
                  </div>
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </PageLayout>
    </Fragment>
  );
};

export default ErrorLogs;
