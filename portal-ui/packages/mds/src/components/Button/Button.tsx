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

import AButton, { Appearance } from "@atlaskit/button";
import React, { FC, useMemo } from "react";
import { ButtonProps, Variant } from "./Button.types";
import styled from "styled-components";

const variantMap: { [key in Variant]: Appearance } = {
  regular: "default",
  callAction: "primary",
  secondary: "danger",
  text: "link",
};
const Span = styled.span(() => {
  return {
    padding: "4px 5px",
  };
});

const Button: FC<ButtonProps & React.ButtonHTMLAttributes<HTMLElement>> = ({
  label,
  variant = "regular",
  icon,
  iconLocation = "end",
  onClick,
  disabled,
  collapseOnSmall = true,
  children,
  fullWidth,
  style,
  ...props
}) => {
  const wrappedIcon = useMemo<React.ReactChild>(
    () => <Span>{icon}</Span>,
    [icon]
  );

  return (
    <AButton
      onClick={onClick}
      isDisabled={disabled || false}
      appearance={variantMap[variant] || props.appearance}
      iconBefore={iconLocation === "start" && icon ? wrappedIcon : undefined}
      iconAfter={iconLocation === "end" && icon ? wrappedIcon : undefined}
      style={{ width: fullWidth ? "100%" : undefined, ...style }}
      {...props}
    >
      {label || children}
    </AButton>
  );
};

export default Button;
