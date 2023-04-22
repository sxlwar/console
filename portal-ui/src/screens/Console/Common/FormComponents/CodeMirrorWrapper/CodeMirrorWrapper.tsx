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

import React from "react";

import CodeEditor from "@uiw/react-textarea-code-editor";
import { Box, Button, CopyIcon, Grid, HelpIcon, Tooltip } from "mds";
import CopyToClipboard from "react-copy-to-clipboard";
import { withStyles } from "../../../../../theme/makeStyles";
import TooltipWrapper from "../../TooltipWrapper/TooltipWrapper";
import { fieldBasic } from "../common/styleLibrary";

interface ICodeWrapper {
  value: string;
  label?: string;
  mode?: string;
  tooltip?: string;
  classes?: any;
  onChange?: (editor: any, data: any, value: string) => any;
  onBeforeChange: (editor: any, data: any, value: string) => any;
  readOnly?: boolean;
  editorHeight?: string;
}

const styles = () => ({
  ...fieldBasic,
});

const CodeMirrorWrapper = ({
  value,
  label = "",
  tooltip = "",
  mode = "json",
  classes,
  onBeforeChange,
  readOnly = false,
  editorHeight = "250px",
}: ICodeWrapper) => {
  return (
    <React.Fragment>
      <Grid item xs={12} sx={{ marginBottom: "10px" }}>
        <label className={classes.inputLabel}>
          <span>{label}</span>
          {tooltip !== "" && (
            <div className={classes.tooltipContainer}>
              <Tooltip tooltip={tooltip} placement="top">
                <div className={classes.tooltip}>
                  <HelpIcon />
                </div>
              </Tooltip>
            </div>
          )}
        </label>
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          maxHeight: editorHeight,
          overflow: "auto",
          border: "1px solid #eaeaea",
        }}
      >
        <CodeEditor
          value={value}
          language={mode}
          onChange={(evn) => {
            onBeforeChange(null, null, evn.target.value);
          }}
          id={"code_wrapper"}
          padding={15}
          style={{
            fontSize: 12,
            backgroundColor: "#fefefe",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            minHeight: editorHeight || "initial",
            color: "#000000",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          background: "#f7f7f7",
          border: "1px solid #eaeaea",
          borderTop: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "2px",
            paddingRight: "5px",
            justifyContent: "flex-end",
            "& button": {
              height: "26px",
              width: "26px",
              padding: "2px",
              " .min-icon": {
                marginLeft: "0",
              },
            },
          }}
        >
          <TooltipWrapper tooltip={"Copy to Clipboard"}>
            <CopyToClipboard text={value}>
              <Button
                type={"button"}
                id={"copy-code-mirror"}
                icon={<CopyIcon />}
                color={"primary"}
                variant={"regular"}
              />
            </CopyToClipboard>
          </TooltipWrapper>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(CodeMirrorWrapper, styles);
