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
import clsx from "clsx";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio, { RadioProps } from "@mui/material/Radio";
import { InputLabel } from "@mui/material";

import { withStyles } from "../../../../../theme/makeStyles";
import { fieldBasic, radioIcons, tooltipHelper } from "../common/styleLibrary";
import { HelpIcon, Grid, Tooltip } from "mds";

export interface SelectorTypes {
  label: any;
  value: string;
}

interface RadioGroupProps {
  selectorOptions: SelectorTypes[];
  currentSelection: string;
  label: any;
  id: string;
  name: string;
  tooltip?: string;
  disableOptions?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: any;
  displayInColumn?: boolean;
}

const styles = () => ({
  ...fieldBasic,
  ...tooltipHelper,
  optionLabel: {
    "&.Mui-disabled": {
      "& .MuiFormControlLabel-label": {
        color: "#9c9c9c",
      },
    },
    "&:last-child": {
      marginRight: 0,
    },
    "& .MuiFormControlLabel-label": {
      fontSize: 12,
      color: "#07193E",
    },
  },
  checkedOption: {
    "& .MuiFormControlLabel-label": {
      fontSize: 12,
      color: "#07193E",
      fontWeight: 700,
    },
  },
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  ...radioIcons,
});


const RadioButton = (props: RadioProps) => {
  const classes = withStyles.getClasses(props) as any;

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={classes.radioSelectedIcon} />}
      icon={<span className={classes.radioUnselectedIcon} />}
      {...props}
    />
  );
};

export const RadioGroupSelector = ({
  selectorOptions = [],
  currentSelection,
  label,
  id,
  name,
  onChange,
  tooltip = "",
  disableOptions = false,
  classes,
  displayInColumn = false,
}: RadioGroupProps) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid item sx={{ fontSize: 60 }}>
        <InputLabel htmlFor={id} className={classes.inputLabel}>
          <span>{label}</span>
          {tooltip !== "" && (
            <div className={classes.tooltipContainer}>
              <Tooltip tooltip={tooltip} placement="top">
                <div>
                  <HelpIcon />
                </div>
              </Tooltip>
            </div>
          )}
        </InputLabel>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label={id}
          id={id}
          name={name}
          value={currentSelection}
          onChange={onChange}
          row={!displayInColumn}
          style={{ display: "flex", textAlign: "right" }}
        >
          {selectorOptions.map((selectorOption) => {
            return (
              <FormControlLabel
                key={`rd-${name}-${selectorOption.value}`}
                value={selectorOption.value}
                control={<RadioButton />}
                label={selectorOption.label}
                disabled={disableOptions}
                className={clsx(classes.optionLabel, {
                  [classes.checkedOption]:
                    selectorOption.value === currentSelection,
                })}
              />
            );
          })}
        </RadioGroup>
      </Grid>
    </Grid>
  );
};

export default withStyles(RadioGroupSelector, styles);
