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
import { RadioGroup } from "@atlaskit/radio";
import React from "react";

import { Grid, HelpIcon, Tooltip } from "mds";
import { withStyles } from "../../../../../theme/makeStyles";
import { fieldBasic, radioIcons, tooltipHelper } from "../common/styleLibrary";

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
  ...radioIcons,
});

export const RadioGroupSelector = ({
  selectorOptions = [],
  currentSelection,
  label,
  id,
  name,
  onChange,
  tooltip = "",
  classes,
}: RadioGroupProps) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid item sx={{ fontSize: 60 }}>
        <label htmlFor={id} className={classes.inputLabel}>
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
        </label>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label={id}
          name={name}
          options={selectorOptions}
          value={currentSelection}
          onChange={onChange}
        ></RadioGroup>
      </Grid>
    </Grid>
  );
};

export default withStyles(RadioGroupSelector, styles);
