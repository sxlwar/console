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
import TextField from "@atlaskit/textfield";
import React, { ClipboardEvent, useState } from "react";

import { ErrorMessage, Field } from "@atlaskit/form";
import WatchFilledIcon from "@atlaskit/icon/glyph/watch-filled";
import clsx from "clsx";
import { Grid, HelpIcon, IconButton, Tooltip, VisibilityOffIcon } from "mds";
import { withStyles } from "../../../../../theme/makeStyles";
import { fieldBasic, tooltipHelper } from "../common/styleLibrary";

interface InputBoxProps {
  label: string;
  classes?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: any) => void;
  onFocus?: () => void;
  onPaste?: (e: ClipboardEvent<HTMLInputElement>) => void;
  value: string | boolean;
  id: string;
  name: string;
  disabled?: boolean;
  multiline?: boolean;
  type?: string;
  tooltip?: string;
  autoComplete?: string;
  index?: number;
  error?: string;
  required?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
  overlayId?: string;
  overlayIcon?: any;
  overlayAction?: () => void;
  overlayObject?: any;
  noLabelMinWidth?: boolean;
  pattern?: string;
  autoFocus?: boolean;
  className?: string;
}

const styles = () => ({
  ...fieldBasic,
  ...tooltipHelper,
  textBoxContainer: {
    flexGrow: 1,
    position: "relative",
  },
  overlayAction: {
    position: "absolute",
    right: 5,
    top: 6,
    "& svg": {
      maxWidth: 15,
      maxHeight: 15,
    },
    "&.withLabel": {
      top: 5,
    },
  },
});

const InputBoxWrapper = ({
  label,
  onChange,
  value,
  id,
  name,
  type = "text",
  autoComplete = "off",
  disabled = false,
  multiline = false,
  tooltip = "",
  index = 0,
  error = "",
  required = false,
  placeholder = "",
  min,
  max,
  overlayId,
  overlayIcon = null,
  overlayObject = null,
  overlayAction,
  noLabelMinWidth = false,
  pattern = "",
  autoFocus = false,
  classes,
  className = "",
  onKeyPress,
  onFocus,
  onPaste,
}: InputBoxProps) => {
  const [toggleTextInput, setToggleTextInput] = useState<boolean>(false);

  let inputBoxWrapperIcon = overlayIcon;
  let inputBoxWrapperType = type;

  if (type === "password" && overlayIcon === null) {
    inputBoxWrapperIcon = toggleTextInput ? (
      <VisibilityOffIcon />
    ) : (
      <WatchFilledIcon label="" />
    );
    inputBoxWrapperType = toggleTextInput ? "text" : "password";
  }

  return (
    <React.Fragment>
      <Grid
        container
        className={clsx(
          className !== "" ? className : "",
          error !== "" ? classes.errorInField : classes.inputBoxContainer
        )}
      >
        <Field
          name={name}
          label={
            label !== "" && (
              <label
                htmlFor={id}
                className={
                  noLabelMinWidth ? classes.noMinWidthLabel : classes.inputLabel
                }
              >
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
            <div className={classes.textBoxContainer}>
              <TextField
                id={id}
                name={name}
                value={value as string}
                autoFocus={autoFocus}
                disabled={disabled}
                onChange={onChange}
                type={inputBoxWrapperType}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className={classes.inputRebase}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                onPaste={onPaste}
              />
              {inputBoxWrapperIcon && (
                <div
                  className={`${classes.overlayAction} ${
                    label !== "" ? "withLabel" : ""
                  }`}
                >
                  <IconButton
                    onClick={
                      overlayAction
                        ? () => {
                            overlayAction();
                          }
                        : () => setToggleTextInput(!toggleTextInput)
                    }
                    id={overlayId}
                    size={"small"}
                  >
                    {inputBoxWrapperIcon}
                  </IconButton>
                </div>
              )}
              {overlayObject && (
                <div
                  className={`${classes.overlayAction} ${
                    label !== "" ? "withLabel" : ""
                  }`}
                >
                  {overlayObject}
                </div>
              )}
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
          )}
        </Field>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(InputBoxWrapper, styles);
