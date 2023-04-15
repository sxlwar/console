// This file is part of MinIO Design System
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

import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { ListItemProps, ListProps } from "./List.types";

const CustomDiv = styled.div<ListProps>((props) => {
  let constructProps: CSSObject = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 5
  };

  return { ...constructProps, ...props.sx };
});

const CustomItemDiv = styled.div<ListItemProps>((props) => {
  let constructProps: CSSObject = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: 'center',
    padding: '1rem',
    border: "1px solid #ccc",
    borderRadius: '5px'
  };

  return { ...constructProps, ...props.sx };
});

export const ListItem: FC<ListItemProps> = (props) => {
  return <CustomItemDiv {...props}>{props.children}</CustomItemDiv>;
};

const List: FC<ListProps> = (props) => {
  return <CustomDiv {...props}>{props.children}</CustomDiv>;
};

export default List;
