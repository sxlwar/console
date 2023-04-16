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

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Button, Checkbox, EventSubscriptionIcon, Grid } from "mds";

import TableTree from "@atlaskit/table-tree";
import { withStyles } from "../../../../theme/makeStyles";
import api from "../../../../common/api";
import { ArnList } from "../types";
import {
  formFieldStyles,
  modalStyleUtils,
} from "../../Common/FormComponents/common/styleLibrary";

import { ErrorResponseHandler } from "../../../../common/types";
import ModalWrapper from "../../Common/ModalWrapper/ModalWrapper";
import InputBoxWrapper from "../../Common/FormComponents/InputBoxWrapper/InputBoxWrapper";
import AutocompleteWrapper from "../../Common/FormComponents/AutocompleteWrapper/AutocompleteWrapper";
import { setModalErrorSnackMessage } from "../../../../systemSlice";
import { useAppDispatch } from "../../../../store";

const styles = () => ({
  arnField: {
    "& div div .MuiOutlinedInput-root": {
      padding: 0,
    },
  },
  ...formFieldStyles,
  ...modalStyleUtils,
});

interface IAddEventProps {
  classes?: any;
  open: boolean;
  selectedBucket: string;
  closeModalAndRefresh: () => void;
}

interface Content {
  label: string;
  value: string;
}

const headers = ["Select", "Event"];

const AddEvent = ({
  classes,
  open,
  selectedBucket,
  closeModalAndRefresh,
}: IAddEventProps) => {
  const dispatch = useAppDispatch();
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [prefix, setPrefix] = useState<string>("");
  const [suffix, setSuffix] = useState<string>("");
  const [arn, setArn] = useState<string>("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [arnList, setArnList] = useState<string[]>([]);

  const addRecord = (event: React.FormEvent) => {
    event.preventDefault();
    if (addLoading) {
      return;
    }
    setAddLoading(true);
    api
      .invoke("POST", `/api/v1/buckets/${selectedBucket}/events`, {
        configuration: {
          arn: arn,
          events: selectedEvents,
          prefix: prefix,
          suffix: suffix,
        },
        ignoreExisting: true,
      })
      .then(() => {
        setAddLoading(false);
        closeModalAndRefresh();
      })
      .catch((err: ErrorResponseHandler) => {
        setAddLoading(false);
        dispatch(setModalErrorSnackMessage(err));
      });
  };

  const fetchArnList = useCallback(() => {
    setAddLoading(true);
    api
      .invoke("GET", `/api/v1/admin/arns`)
      .then((res: ArnList) => {
        let arns: string[] = [];
        if (res.arns !== null) {
          arns = res.arns;
        }
        setAddLoading(false);
        setArnList(arns);
      })
      .catch((err: ErrorResponseHandler) => {
        setAddLoading(false);
        dispatch(setModalErrorSnackMessage(err));
      });
  }, [dispatch]);

  useEffect(() => {
    fetchArnList();
  }, [fetchArnList]);

  const events = [
    {content: { label: "PUT - Object Uploaded", value: "put" }, id: 'put', hasChildren: false, children: []},
    {content: { label: "GET - Object accessed", value: "get" }, id: 'get', hasChildren: false, children: []},
    {content: { label: "DELETE - Object Deleted", value: "delete" }, id: 'delete', hasChildren: false, children: []},
  ];

  const handleClick = useCallback(
    (event: React.MouseEvent<unknown> | ChangeEvent<unknown>, name: string) => {
      const selectedIndex = selectedEvents.indexOf(name);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedEvents, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedEvents.slice(1));
      } else if (selectedIndex === selectedEvents.length - 1) {
        newSelected = newSelected.concat(selectedEvents.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedEvents.slice(0, selectedIndex),
          selectedEvents.slice(selectedIndex + 1)
        );
      }
      setSelectedEvents(newSelected);
    },
    [selectedEvents]
  );

  const arnValues = arnList.map((arnConstant) => ({
    label: arnConstant,
    value: arnConstant,
  }));

  const Select = useCallback(
    (props: Content) => {
      return (
        <Checkbox
          value={props.value}
          color="primary"
          onChange={(event) => handleClick(event, props.value)}
          checked={selectedEvents.includes(props.value)}
        />
      );
    },
    [handleClick, selectedEvents]
  );
  const Event = (props: Content) => {
    console.log(props);
    return <span>{props.label}</span>
  };

  return (
    <ModalWrapper
      modalOpen={open}
      onClose={() => {
        closeModalAndRefresh();
      }}
      title="Subscribe To Bucket Events"
      titleIcon={<EventSubscriptionIcon />}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          addRecord(e);
        }}
      >
        <Grid container>
          <Grid item xs={12} className={classes.formScrollable}>
            <Grid
              item
              xs={12}
              className={`${classes.arnField} ${classes.formFieldRow}`}
            >
              <AutocompleteWrapper
                onChange={(value: string) => {
                  setArn(value);
                }}
                id="select-access-policy"
                name="select-access-policy"
                label={"ARN"}
                value={arn}
                options={arnValues}
              />
            </Grid>
            <Grid item xs={12} className={classes.formFieldRow}>
              <InputBoxWrapper
                id="prefix-input"
                name="prefix-input"
                label="Prefix"
                value={prefix}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPrefix(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.formFieldRow}>
              <InputBoxWrapper
                id="suffix-input"
                name="suffix-input"
                label="Suffix"
                value={suffix}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSuffix(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} className={classes.formFieldRow}>
              <TableTree
                columns={[Select, Event]}
                headers={headers}
                columnWidths={["50px", "300px"]}
                items={events}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.modalButtonBar}>
            <Button
              id={"cancel-add-event"}
              type="button"
              variant="regular"
              disabled={addLoading}
              onClick={() => {
                closeModalAndRefresh();
              }}
              label={"Cancel"}
            />
            <Button
              id={"save-event"}
              type="submit"
              variant="callAction"
              disabled={addLoading}
              label={"Save"}
            />
          </Grid>
        </Grid>
      </form>
    </ModalWrapper>
  );
};

export default withStyles(AddEvent, styles);
