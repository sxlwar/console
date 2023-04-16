// This file is part of MinIO Design System
// Copyright (c) 2023 MinIO, Inc.
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

import React, { FC, useState } from "react";
import styled from "styled-components";
import { ArrowDropDown } from "../Icons";
import { AccordionProps } from "./Accordion.types";

const AccordionBasic = styled.div<AccordionProps>(({ theme, sx }) => ({
  border: "1px solid rgba(129, 129, 129, 0.3)",
  boxShadow:
    "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
  cursor: "pointer",
  padding: "1rem",
  "& .summary": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& .detail": {
    padding: "1rem 2rem",
  },
  "& .icon": {
    width: "1rem",
    height: "1rem",
  },
  "& .icon[data-collapsed=false]": {
    transform: "rotate(180deg)",
  },
  ...sx,
}));

const Accordion: FC<AccordionProps> = ({
  sx,
  summary,
  detail,
  onClick,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <AccordionBasic
      onClick={(event) => {
        setCollapsed(!collapsed);
        onClick?.(event);
      }}
      sx={sx}
      {...props}
    >
      <div className="summary">
        {summary}
        <ArrowDropDown data-collapsed={collapsed.toString()} className="icon" />
      </div>
      {!collapsed && <div className="detail">{detail}</div>}
    </AccordionBasic>
  );
};

export default Accordion;
