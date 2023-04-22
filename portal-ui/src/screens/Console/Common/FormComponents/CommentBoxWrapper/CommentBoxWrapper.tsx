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

import { ErrorMessage, Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React from "react";

import { Grid, HelpIcon, Tooltip } from "mds";
import { withStyles } from "../../../../../theme/makeStyles";
import { fieldBasic, tooltipHelper } from "../common/styleLibrary";

interface CommentBoxProps {
  label: string;
  classes?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | boolean;
  id: string;
  name: string;
  disabled?: boolean;
  tooltip?: string;
  index?: number;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const styles = () => ({
  ...fieldBasic,
  ...tooltipHelper,
  inputLabel: {
    ...fieldBasic.inputLabel,
    fontSize: 14,
    margin: 0,
    alignItems: "flex-start",
    paddingTop: "20px",
    flexWrap: "wrap",
    display: "flex",
  },
  textBoxContainer: {
    flexGrow: 1,
    position: "relative",
  },
  cssOutlinedInput: {
    borderColor: "#EAEAEA",
    padding: 16,
  },
  rootContainer: {
    "& .MuiOutlinedInput-inputMultiline": {
      ...fieldBasic.inputLabel,
      fontSize: 13,
      minHeight: 150,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#07193E",
      borderWidth: 1,
    },
    "& textarea": {
      color: "#07193E",
      fontSize: 13,
      fontWeight: 600,
      "&:placeholder": {
        color: "#858585",
        opacity: 1,
        fontWeight: 400,
      },
    },
  },
});

const CommentBoxWrapper = ({
  label,
  onChange,
  value,
  id,
  name,
  disabled = false,
  tooltip = "",
  index = 0,
  error = "",
  required = false,
  placeholder = "",
  classes,
}: CommentBoxProps) => {
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        className={`${classes.fieldContainer} ${
          error !== "" ? classes.errorInField : ""
        }`}
      >
        <Field
          name={name}
          label={
            label !== "" && (
              <label htmlFor={id} className={classes.inputLabel}>
                <span>
                  {label}
                  {required ? "*" : ""}
                </span>
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
            )
          }
        >
          {(fieldProps) => (
            <React.Fragment>
              <TextField
                {...fieldProps}
                id={id}
                value={value as string}
                disabled={disabled}
                onChange={onChange}
                rows={5}
                placeholder={placeholder}
              ></TextField>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </React.Fragment>
          )}
        </Field>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(CommentBoxWrapper, styles);
