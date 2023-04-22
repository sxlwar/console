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
import { Field } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { Tooltip } from "mds";
import React, { useState } from "react";
import { withStyles } from "../../../../../theme/makeStyles";

import Popup from "@atlaskit/popup";
import { Grid, HelpIcon } from "mds";
import { fieldBasic, tooltipHelper } from "../common/styleLibrary";

interface selectorTypes {
  label: string;
  value: string;
}

interface SelectProps {
  options: selectorTypes[];
  value: string;
  label: string;
  id: string;
  name: string;
  tooltip?: string;
  onChange: (returnedValue: string) => void;
  disabled?: boolean;
  classes?: any;
}

const styles = () => ({
  ...fieldBasic,
  ...tooltipHelper,
});

const AutocompleteWrapper = ({
  classes,
  id,
  name,
  onChange,
  options,
  label,
  tooltip = "",
  value,
  disabled = false,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<selectorTypes>(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const executeOnSelect = (data: selectorTypes) => {
    const value = data.value;
    const selectedValue = options.find((item) => item.value === value);

    if (selectedValue) {
      onChange(selectedValue.value);
      setInternalValue(selectedValue);
    }
  };

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.fieldContainer}>
        <Field
          aria-required={true}
          name="username"
          label={
            tooltip !== "" ? (
              <div className={classes.tooltipContainer}>
                <Tooltip tooltip={tooltip} placement="top">
                  <div className={classes.tooltip}>
                    {label}
                    <HelpIcon />
                  </div>
                </Tooltip>
              </div>
            ) : (
              label
            )
          }
          isRequired
          defaultValue="dst12"
        >
          {({ fieldProps, error }) => (
            <React.Fragment>
              <Popup
                isOpen={isOpen}
                content={() => (
                  <div style={{ padding: "1em" }}>
                    {options.map((item) => (
                      <p
                        key={item.label}
                        onClick={() => executeOnSelect(item)}
                        style={{
                          margin: "10px 0",
                          padding: "5px 10px",
                          cursor: "pointer",
                          background:
                            item.value === internalValue.value
                              ? "rgba(129,129,129, .3)"
                              : "inherit",
                        }}
                      >
                        {item.label}
                      </p>
                    ))}
                  </div>
                )}
                trigger={(triggerProps) => (
                  <div {...triggerProps}>
                    <TextField
                      {...fieldProps}
                      id={id}
                      name={name}
                      disabled={disabled}
                      autoComplete="on"
                      value={value}
                      onFocus={() => setIsOpen(true)}
                      onBlur={() => setIsOpen(false)}
                    />
                  </div>
                )}
              ></Popup>
            </React.Fragment>
          )}
        </Field>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(AutocompleteWrapper, styles);
