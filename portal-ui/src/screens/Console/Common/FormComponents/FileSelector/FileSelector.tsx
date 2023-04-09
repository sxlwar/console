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

import React, { useState } from "react";
import get from "lodash/get";
import { InputLabel, Tooltip } from "@mui/material";

import { withStyles } from "../../../../../theme/makeStyles";
import AttachmentIcon from '@atlaskit/icon/glyph/attachment'
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle'
import {
  fieldBasic,
  fileInputStyles,
  tooltipHelper,
} from "../common/styleLibrary";
import { fileProcess } from "./utils";
import { Grid, HelpIcon, IconButton } from "mds";
import ErrorBlock from "../../../../shared/ErrorBlock";

interface InputBoxProps {
  label: string;
  classes?: any;
  onChange: (e: string, i: string) => void;
  id: string;
  name: string;
  disabled?: boolean;
  tooltip?: string;
  required?: boolean;
  error?: string;
  accept?: string;
  value?: string;
}

const styles = () => ({
  ...fieldBasic,
  ...tooltipHelper,
  valueString: {
    maxWidth: 350,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: 2,
  },
  fileInputField: {
    margin: "13px 0",
    "@media (max-width: 900px)": {
      flexFlow: "column",
    },
  },
  ...fileInputStyles,
  inputLabel: {
    ...fieldBasic.inputLabel,
    fontWeight: "normal",
  },
  textBoxContainer: {
    ...fieldBasic.textBoxContainer,
    maxWidth: "100%",
    border: "1px solid #eaeaea",
    paddingLeft: "15px",
  },
});

const FileSelector = ({
  label,
  classes,
  onChange,
  id,
  name,
  disabled = false,
  tooltip = "",
  required,
  error = "",
  accept = "",
  value = "",
}: InputBoxProps) => {
  const [showFileSelector, setShowSelector] = useState(false);

  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        className={`${classes.fileInputField} ${classes.fieldBottom} ${
          classes.fieldContainer
        } ${error !== "" ? classes.errorInField : ""}`}
      >
        {label !== "" && (
          <InputLabel
            htmlFor={id}
            className={`${error !== "" ? classes.fieldLabelError : ""} ${
              classes.inputLabel
            }`}
          >
            <span>
              {label}
              {required ? "*" : ""}
            </span>
            {tooltip !== "" && (
              <div className={classes.tooltipContainer}>
                <Tooltip title={tooltip} placement="top-start">
                  <div className={classes.tooltip}>
                    <HelpIcon />
                  </div>
                </Tooltip>
              </div>
            )}
          </InputLabel>
        )}

        {showFileSelector || value === "" ? (
          <div className={classes.textBoxContainer}>
            <input
              type="file"
              name={name}
              onChange={(e) => {
                const fileName = get(e, "target.files[0].name", "");
                fileProcess(e, (data: any) => {
                  onChange(data, fileName);
                });
              }}
              accept={accept}
              required={required}
              disabled={disabled}
              className={classes.fileInputField}
            />

            {value !== "" && (
              <IconButton
                color="primary"
                aria-label="upload picture"
                onClick={() => {
                  setShowSelector(false);
                }}
                size="small"
              >
                <CrossCircleIcon  label=""/>
              </IconButton>
            )}

            {error !== "" && <ErrorBlock errorMessage={error} />}
          </div>
        ) : (
          <div className={classes.fileReselect}>
            <div className={classes.valueString}>{value}</div>
            <IconButton
              color="primary"
              aria-label="upload picture"
              onClick={() => {
                setShowSelector(true);
              }}
              size="small"
            >
              <AttachmentIcon  label=""/>
            </IconButton>
          </div>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(FileSelector, styles);
