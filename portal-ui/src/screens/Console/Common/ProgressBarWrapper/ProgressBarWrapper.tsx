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

import React, { Fragment } from "react";
import ProgressBar from "@atlaskit/progress-bar";
import { Box } from "mds";
import { CustomProgressBarProps } from "@atlaskit/progress-bar/dist/types/types";
import { withStyles } from "../../../../theme/makeStyles";

interface IProgressBarWrapper {
  value: number;
  ready: boolean;
  indeterminate?: boolean;
  withLabel?: boolean;
  size?: string;
  error?: boolean;
  cancelled?: boolean;
}

const BorderLinearProgress = withStyles(ProgressBar, () => ({
  root: {
    height: "10px",
    borderRadius: "5px",
  },
}));
const SmallBorderLinearProgress = withStyles(BorderLinearProgress, () => ({
  root: {
    height: 6,
    borderRadius: 3,
  },
}));

function LinearProgressWithLabel(
  props: { error: boolean; cancelled: boolean } & CustomProgressBarProps
) {
  let color = "#000";
  let size = 18;

  if (props.error) {
    color = "#C83B51";
    size = 14;
  } else if (props.cancelled) {
    color = "#FFBD62";
    size = 14;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 3 }}>
        <BorderLinearProgress isIndeterminate {...props} />
      </Box>
      <Box
        sx={{
          minWidth: 35,
          fontSize: size,
          color: color,
        }}
        className={"value"}
      >
        {props.cancelled ? (
          "Cancelled"
        ) : (
          <Fragment>
            {props.error ? "Failed" : `${Math.round(props.value || 0)}%`}
          </Fragment>
        )}
      </Box>
    </Box>
  );
}

const ProgressBarWrapper = ({
  value,
  ready,
  indeterminate,
  withLabel,
  size = "regular",
  error,
  cancelled,
}: IProgressBarWrapper) => {
  let color: any;
  if (error) {
    color = "error";
  } else if (cancelled) {
    color = "warning";
  } else if (value === 100 && ready) {
    color = "success";
  } else {
    color = "primary";
  }
  const propsComponent = {
    variant:
      indeterminate && !ready && !cancelled ? "indeterminate" : "determinate",
    value: ready ? 100 : value,
    color: color,
  };
  if (withLabel) {
    return (
      <LinearProgressWithLabel
        {...propsComponent}
        error={!!error}
        cancelled={!!cancelled}
      />
    );
  }
  if (size === "small") {
    return <SmallBorderLinearProgress {...propsComponent} />;
  }

  return <BorderLinearProgress {...propsComponent} />;
};

export default ProgressBarWrapper;
