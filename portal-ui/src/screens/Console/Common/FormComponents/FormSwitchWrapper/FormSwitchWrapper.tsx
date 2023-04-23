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

import Toggle from '@atlaskit/toggle';
import clsx from "clsx";
import { Grid, HelpIcon, Tooltip } from "mds";
import { withStyles } from "../../../../../theme/makeStyles";
import { actionsTray, fieldBasic } from "../common/styleLibrary";

interface IFormSwitch {
  label?: string;
  classes?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | boolean;
  id: string;
  name: string;
  disabled?: boolean;
  tooltip?: string;
  description?: string;
  index?: number;
  checked: boolean;
  switchOnly?: boolean;
  indicatorLabels?: string[];
}

const styles = () => ({
  indicatorLabelOn: {
    fontWeight: "bold",
    color: "#081C42 !important",
  },
  indicatorLabel: {
    fontSize: 12,
    color: "#E2E2E2",
    margin: "0 8px 0 10px",
  },
  fieldDescription: {
    marginTop: 4,
    color: "#999999",
  },
  tooltip: {
    fontSize: 16,
  },
  ...actionsTray,
  ...fieldBasic,
});

const FormSwitchWrapper = ({
  label = "",
  onChange,
  value,
  id,
  name,
  checked = false,
  disabled = false,
  switchOnly = false,
  tooltip = "",
  description = "",
  classes,
  indicatorLabels,
}: IFormSwitch) => {
  const switchComponent = (
    <React.Fragment>
      {!switchOnly && (
        <span
          className={clsx(classes.indicatorLabel, {
            [classes.indicatorLabelOn]: !checked,
          })}
        >
          {indicatorLabels && indicatorLabels.length > 1
            ? indicatorLabels[1]
            : "OFF"}
        </span>
      )}
      <Toggle
        isChecked={checked}
        onChange={onChange}
        name={name}
        isDisabled={disabled}
        value={value as string}
        id={id}
      />
      {!switchOnly && (
        <span
          className={clsx(classes.indicatorLabel, {
            [classes.indicatorLabelOn]: checked,
          })}
        >
          {indicatorLabels ? indicatorLabels[0] : "ON"}
        </span>
      )}
    </React.Fragment>
  );

  if (switchOnly) {
    return switchComponent;
  }

  return (
    <div>
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={8} md={8}>
          {label !== "" && (
            <label htmlFor={id} className={classes.inputLabel}>
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
          )}
        </Grid>
        <Grid
          item
          xs={12}
          sm={label !== "" ? 4 : 12}
          md={label !== "" ? 4 : 12}
          sx={{
            textAlign: "right",
            justifyContent: "end",
          }}
          className={classes.switchContainer}
        >
          {switchComponent}
        </Grid>
        {description !== "" && (
          <Grid item xs={12} style={{ textAlign: "left" }}>
            <p className={classes.fieldDescription}>{description}</p>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withStyles(FormSwitchWrapper, styles);
