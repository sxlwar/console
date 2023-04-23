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

import { useSelector } from "react-redux";
import { withStyles } from "../../../theme/makeStyles";

import { AppState, useAppDispatch } from "../../../store";

import {
  AtlassianNavigation,
  PrimaryButton,
  PrimaryDropdownButton,
} from "@atlaskit/atlassian-navigation";
import DropdownMenu, {
  DropdownItem
} from "@atlaskit/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { selFeatures } from "../consoleSlice";
import { validRoutes } from "../valid-routes";
import MenuToggle from "./MenuToggle";
import { IMenuItem } from "./types";

const styles = () => ({
  drawer: {
    "& header": {
      height: "auto",
    },
  },
});

interface IMenuProps {
  classes?: any;
}

const Menu = ({ classes }: IMenuProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const features = useSelector(selFeatures);

  const sidebarOpen = useSelector(
    (state: AppState) => state.system.sidebarOpen
  );

  const allowedMenuItems: IMenuItem[] = validRoutes(features);
  console.log(allowedMenuItems);

  const items = allowedMenuItems.map((item) => {
    if (item.children?.length) {
      return (
        <DropdownMenu
          key={item.name}
          trigger={({ triggerRef, ...props }) => (
            <PrimaryDropdownButton {...props} ref={triggerRef}>
              {item.name}
            </PrimaryDropdownButton>
          )}
        >
          {item.children.map((it) => (
            <DropdownItem
              key={it.name}
              onClick={() => {
                if (it.to) {
                  navigate(it.to);
                }
              }}
            >
              {it.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      );
    }

    return (
      <PrimaryButton
        key={item.name}
        onClick={() => {
          if (item.to) {
            navigate(item.to);
          }
        }}
      >
        {item.name}
      </PrimaryButton>
    );
  });

  return (
    <div className={classes.drawer}>
      <AtlassianNavigation
        renderProductHome={() => (
          <MenuToggle
            onToggle={(nextState) => {
              // dispatch(menuOpen(nextState));
            }}
            isOpen={sidebarOpen}
          />
        )}
        label="site"
        primaryItems={[...items, <PrimaryButton>Sign Out</PrimaryButton>]}
      />
    </div>
  );
};

export default withStyles(Menu, styles);
