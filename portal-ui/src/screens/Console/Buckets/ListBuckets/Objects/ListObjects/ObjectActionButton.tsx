// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
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
import { Button } from "mds";

import { withStyles } from "../../../../../../theme/makeStyles";
import clsx from "clsx";

type ObjectActionButtonProps = {
  disabled?: boolean;
  onClick: () => void | any;
  icon: React.ReactNode;
  label: string;
  [x: string]: any;
};

const styles = () => ({
  root: {
    padding: "0 15px",
    height: 22,
    margin: 0,
    color: "#5E5E5E",
    fontWeight: "normal",
    fontSize: 14,
    whiteSpace: "nowrap" as any,
    width: "100%",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#000",
    },
    "& .min-icon": {
      width: 11,
    },
    "&:disabled": {
      color: "#EBEBEB",
      borderColor: "#EBEBEB",
    },
  },
});

// TODO: Create an mds version of this.
const ObjectActionButton = ({
  disabled,
  onClick,
  icon,
  label,
  classes,
  ...restProps
}: ObjectActionButtonProps) => {
  return (
    <Button
      {...restProps}
      disabled={disabled}
      onClick={onClick}
      className={clsx(classes.root, "noDefaultHeight")}
      iconBefore={icon as React.ReactChild}
      id="ObjectActionButton"
    >
      <span className={"buttonItem"}>{label}</span>
    </Button>
  );
};

export default withStyles(ObjectActionButton, styles);
