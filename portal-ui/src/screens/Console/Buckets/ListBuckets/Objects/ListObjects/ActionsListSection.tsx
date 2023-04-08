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

import React, { Fragment } from "react";
import ObjectActionButton from "./ObjectActionButton";
import { withStyles } from "../../../../../../theme/makeStyles";

import { detailsPanel } from "../../../../Common/FormComponents/common/styleLibrary";
import TooltipWrapper from "../../../../Common/TooltipWrapper/TooltipWrapper";

const styles = () =>
  ({
    ...detailsPanel,
  });

export interface MultiSelectionItem {
  action: () => void;
  label: string;
  disabled: boolean;
  icon: React.ReactNode;
  tooltip: string;
}

interface IActionsListSectionProps {
  items: MultiSelectionItem[];
  title: string | React.ReactNode;
  classes?: any;
}

const ActionsListSection = ({
  items,
  classes,
  title,
}: IActionsListSectionProps) => {
  return (
    <Fragment>
      <div className={classes.titleLabel}>{title}</div>
      <ul className={classes.objectActions}>
        <li>Actions:</li>
        {items.map((actionItem, index) => {
          return (
            <li key={`action-element-${index.toString()}`}>
              <TooltipWrapper tooltip={actionItem.tooltip || ""}>
                <ObjectActionButton
                  label={actionItem.label}
                  icon={actionItem.icon}
                  onClick={actionItem.action}
                  disabled={actionItem.disabled}
                />
              </TooltipWrapper>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default withStyles(ActionsListSection, styles);;
