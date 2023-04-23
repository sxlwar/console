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

import { ButtonItem } from "@atlaskit/menu";
import { MenuCollapsedIcon, MenuExpandedIcon, Tooltip } from "mds";
import React, { Suspense, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { hasPermission } from "../../../common/SecureComponent";
import {
  CONSOLE_UI_RESOURCE,
  IAM_PAGES_PERMISSIONS,
} from "../../../common/SecureComponent/permissions";

const MenuItem = ({
  page,
  stateClsName = "",
  onExpand,
  selectedMenuItem,
  pathValue = "",
  expandedGroup = "",
  setSelectedMenuItem,
  id = `${Math.random()}`,
  setPreviewMenuGroup,
  previewMenuGroup,
}: {
  page: any;
  stateClsName?: string;
  setSelectedMenuItem: (value: string) => void;
  selectedMenuItem?: any;
  pathValue?: string;
  onExpand: (id: any) => void;
  expandedGroup?: string;
  id?: string;
  setPreviewMenuGroup: (value: string) => void;
  previewMenuGroup: string;
}) => {
  const navigate = useNavigate();
  const childrenMenuList = page?.children?.filter(
    (item: any) =>
      ((item.customPermissionFnc
        ? item.customPermissionFnc()
        : hasPermission(CONSOLE_UI_RESOURCE, IAM_PAGES_PERMISSIONS[item.to])) ||
        item.forceDisplay) &&
      !item.fsHidden
  );

  let hasChildren = childrenMenuList?.length;

  const expandCollapseHandler = useCallback(
    (e: any) => {
      e.preventDefault();
      if (previewMenuGroup === page.id) {
        setPreviewMenuGroup("");
      } else if (page.id !== selectedMenuItem) {
        setPreviewMenuGroup(page.id);
        onExpand("");
      }

      if (page.id === selectedMenuItem && selectedMenuItem === expandedGroup) {
        onExpand(null);
      } else if (page.id === selectedMenuItem) {
        onExpand(selectedMenuItem);
        setPreviewMenuGroup("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, selectedMenuItem, previewMenuGroup, expandedGroup]
  );

  const selectMenuHandler = useCallback(
    (e: any) => {
      onExpand(page.id);
      setSelectedMenuItem(page.to);
      page.onClick && page.onClick(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  const onClickHandler = hasChildren
    ? expandCollapseHandler
    : selectMenuHandler;

  const isActiveGroup = expandedGroup === page.id;

  const isPathEqual = useCallback((p1: string, p2: string) => {
    return (
      p1
        ?.split("/")
        .filter((item: string) => !!item)
        .join("_") ===
      p2
        ?.split("/")
        .filter((item: string) => !!item)
        .join("_")
    );
  }, []);

  const isSelected =
    isPathEqual(page.to ?? "", selectedMenuItem ?? "") && !hasChildren;

  return (
    <React.Fragment>
      <ButtonItem
        key={page.to}
        onClick={(e: any) => {
          onClickHandler(e);
          setSelectedMenuItem(page.to);
          navigate(page.to);
        }}
        isSelected={isSelected}
        iconBefore={
          page.icon && (
            <Tooltip tooltip={`${page.name}`} placement="right">
              <Suspense fallback={<div>...</div>}>
                <page.icon style={{ color: "white", width: 18, height: 18 }} />
              </Suspense>
            </Tooltip>
          )
        }
        cssFn={(state) => {
          return {
            ...state,
            background: isSelected ? "rgba(0 0 0 / 0.3)" : "inherit",
          };
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
            color: "white",
            textDecoration: "none",
          }}
        >
          {page.name && (
            <div className={stateClsName}>
              {page.name} {page.badge ? <page.badge /> : null}
            </div>
          )}

          {hasChildren ? (
            isActiveGroup || previewMenuGroup === page.id ? (
              <MenuExpandedIcon
                height={15}
                width={15}
                className="group-icon"
                style={{ color: "#fff" }}
              />
            ) : (
              <MenuCollapsedIcon
                height={15}
                width={15}
                className="group-icon"
                style={{ color: "#fff" }}
              />
            )
          ) : null}
        </span>
      </ButtonItem>

      {(isActiveGroup || previewMenuGroup === page.id) && hasChildren ? (
        <>
          {childrenMenuList.map((item: any) => {
            const is = isPathEqual(item.to, selectedMenuItem);

            return (
              <ButtonItem
                onClick={(e: any) => {
                  if (page.id) {
                    setPreviewMenuGroup(page.id);
                    setSelectedMenuItem(item.to);
                  }
                  navigate(item.to);
                }}
                iconBefore={
                  item.icon && (
                    <Suspense fallback={<div>...</div>}>
                      <item.icon />
                    </Suspense>
                  )
                }
                iconAfter={item.badge ? <item.badge /> : null}
                cssFn={(state) => {
                  return {
                    ...state,
                    color: "white",
                    textDecoration: "none",
                    background: is ? "rgba(0 0 0 / 0.3)" : "inherit",
                  };
                }}
              >
                {item.name}
              </ButtonItem>
            );
          })}
        </>
      ) : null}
    </React.Fragment>
  );
};

export default MenuItem;
