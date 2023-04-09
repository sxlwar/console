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
import {
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Property } from 'csstype';
import { withStyles } from "../../../../../theme/makeStyles";
import { fieldBasic, tooltipHelper } from "../common/styleLibrary";
import { HelpIcon, Grid, Tooltip } from "mds";

export interface selectorTypes {
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
  onChange: (e: SelectChangeEvent<string>) => void;
  disabled?: boolean;
  classes?: any;
}

const styles = () => ({
  ...fieldBasic,
  ...tooltipHelper,
  fieldContainer: {
    display: "flex",
    "@media (max-width: 600px)": {
      flexFlow: "column",
    },
  },
});

const SelectStyled = withStyles(InputBase, () => ({
  root: {
    height: 38,
    lineHeight: 1,
    "label + &": {
      marginTop: "10px",
    },
  },
  input: {
    height: 38,
    position: "relative" as Property.Position,
    color: "#07193E",
    fontSize: 13,
    fontWeight: 600,
    padding: "8px 20px 10px 10px",
    border: "#e5e5e5 1px solid",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      borderColor: "#393939",
    },
    "&:focus": {
      backgroundColor: "#fff",
    },
  },
}));

const SelectWrapper = ({
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
  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.fieldContainer}>
        {label !== "" && (
          <InputLabel htmlFor={id} className={classes.inputLabel}>
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
          </InputLabel>
        )}
        <FormControl fullWidth>
          <Select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            input={<SelectStyled />}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem
                value={option.value}
                key={`select-${name}-${option.label}`}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(SelectWrapper, styles);
