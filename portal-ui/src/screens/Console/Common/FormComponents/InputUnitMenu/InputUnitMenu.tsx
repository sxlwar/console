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

import { ButtonItem, MenuGroup } from "@atlaskit/menu";
import Popup from "@atlaskit/popup";
import { withStyles } from "../../../../../theme/makeStyles";
import { selectorTypes } from "../SelectWrapper/SelectWrapper";

interface IInputUnitBox {
  classes?: any;
  id: string;
  unitSelected: string;
  unitsList: selectorTypes[];
  disabled?: boolean;
  onUnitChange?: (newValue: string) => void;
}

const styles = () => ({
  buttonTrigger: {
    border: "#F0F2F2 1px solid",
    borderRadius: 3,
    color: "#838383",
    backgroundColor: "#fff",
    fontSize: 12,
  },
});

const InputUnitMenu = ({
  classes,
  id,
  unitSelected,
  unitsList,
  disabled = false,
  onUnitChange,
}: IInputUnitBox) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  const handleClose = (newUnit: string) => {
    setIsOpen(false);
    if (newUnit !== "" && onUnitChange) {
      onUnitChange(newUnit);
    }
  };

  return (
    <Fragment>
      <Popup
        isOpen={isOpen}
        trigger={() => (
          <button
            id={`${id}-button`}
            aria-controls={`${id}-menu`}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}
            onClick={handleClick}
            className={classes.buttonTrigger}
            disabled={disabled}
            type={"button"}
          >
            {unitSelected}
          </button>
        )}
        content={() => (
          <MenuGroup>
            {unitsList.map((unit) => (
              <ButtonItem
                onClick={() => handleClose(unit.value)}
                key={`itemUnit-${unit.value}-${unit.label}`}
              >
                {unit.label}
              </ButtonItem>
            ))}
          </MenuGroup>
        )}
      ></Popup>
    </Fragment>
  );
};

export default withStyles(InputUnitMenu, styles);
