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
import {
  FormControl,
  InputLabel,
  OutlinedInputProps,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { makeStyles, withStyles } from "../../../../../theme/makeStyles";
import Autocomplete from "@mui/material/Autocomplete";

import {
  fieldBasic,
  inputFieldStyles,
  tooltipHelper,
} from "../common/styleLibrary";
import { HelpIcon, Grid } from "mds";

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

const inputStyles = makeStyles()((theme) => ({
  ...inputFieldStyles,
}));

function InputField(props: TextFieldProps) {
  const classes = inputStyles();

  return (
    <TextField
      InputProps={{ classes } as Partial<OutlinedInputProps>}
      {...props}
    />
  );
}

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

  const executeOnSelect = (_: any, selectedValue: any) => {
    if (selectedValue) {
      onChange(selectedValue.value);
      setInternalValue(selectedValue);
    }
  };

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.fieldContainer}>
        {label !== "" && (
          <InputLabel htmlFor={id} className={classes.inputLabel}>
            <span>{label}</span>
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
        <FormControl fullWidth>
          <Autocomplete
            id={id}
            options={options}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option) => option.value === value}
            disabled={disabled}
            renderInput={(params) => <InputField {...params} name={name} />}
            value={internalValue}
            onChange={executeOnSelect}
            autoHighlight
          />
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(AutocompleteWrapper, styles);
