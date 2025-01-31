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


import { ClosePanelIcon, IconButton, Grid } from "mds";
import { makeStyles } from "../../../../../../theme/makeStyles";

interface IDetailsListPanel {
  open: boolean;
  className?: string;
  closePanel: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles()(() =>
  ({
    detailsList: {
      borderColor: "#EAEDEE",
      borderWidth: 0,
      borderStyle: "solid",
      borderRadius: 3,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: 0,
      transitionDuration: "0.3s",
      overflowX: "hidden",
      overflowY: "auto",
      position: "relative",
      opacity: 0,
      marginLeft: -1,
      "&.open": {
        width: 300,
        minWidth: 300,
        borderLeftWidth: 1,
        opacity: 1,
      },
      "@media (max-width: 799px)": {
        "&.open": {
          width: "100%",
          minWidth: "100%",
          borderLeftWidth: 0,
        },
      },
    },
    closePanel: {
      position: "absolute",
      right: 0,
      top: 8,
      "& .min-icon": {
        width: 14,
      },
    },
  })
);

const DetailsListPanel = ({
  open,
  closePanel,
  className = "",
  children,
}: IDetailsListPanel) => {
  const { classes } = useStyles();

  return (
    <Grid
      item
      className={`${classes.detailsList} ${
        open ? "open" : ""
      } ${className} detailsListPanel`}
    >
      <IconButton onClick={closePanel} className={classes.closePanel}>
        <ClosePanelIcon />
      </IconButton>
      {children}
    </Grid>
  );
};

export default DetailsListPanel;
