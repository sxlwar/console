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
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "react-virtualized/styles.css";

import { GlobalStyles, ThemeHandler } from "mds";
import { useSelector } from "react-redux";
import "./index.css";
import { AppState } from "./store";
import { withStyles } from "./theme/makeStyles";

interface IStyleHandler {
  children: React.ReactNode;
}

const StyleHandler = ({ children }: IStyleHandler) => {
  const colorVariants = useSelector(
    (state: AppState) => state.system.overrideStyles
  );

  let globalBody: any = {};
  let rowColor: any = { color: "#393939" };
  let detailsListPanel: any = { backgroundColor: "#fff" };

  if (colorVariants) {
    globalBody = {
      backgroundColor: `${colorVariants.backgroundColor}!important`,
    };
    rowColor = { color: `${colorVariants.fontColor}!important` };
    detailsListPanel = {
      backgroundColor: colorVariants.backgroundColor,
      color: colorVariants.fontColor,
    };
  }

  // Kept for Compatibility purposes. Once mds migration is complete then this will be removed
  const GlobalCss = withStyles(
    () => null,
    () => ({
      root: {
        // @global is handled by jss-plugin-global.
        "@global": {
          body: {
            ...globalBody,
          },
          ".rowLine": {
            ...rowColor,
          },
          ".detailsListPanel": {
            ...detailsListPanel,
          },
        },
      },
    })
  );

  // ThemeHandler is needed for MDS components theming. Eventually we will remove Theme Provider & use only mds themes.
  return (
    <Fragment>
      <GlobalStyles />
      <GlobalCss />
      <ThemeHandler>{children}</ThemeHandler>
    </Fragment>
  );
};

export default StyleHandler;
