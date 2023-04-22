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
import { SearchIcon } from "mds";
import TextField from "@atlaskit/textfield";
import { withStyles } from "../../../theme/makeStyles";

import { searchField } from "./FormComponents/common/styleLibrary";

const styles = () => ({
  searchField: {
    ...searchField.searchField,
  },
  adornment: {},
});

type SearchBoxProps = {
  placeholder?: string;
  value: string;
  classes?: any;
  onChange: (value: string) => void;
  adornmentPosition?: "start" | "end";
  overrideClass?: any;
};

const SearchBox = ({
  placeholder = "",
  classes,
  onChange,
  adornmentPosition = "end",
  overrideClass,
  value,
}: SearchBoxProps) => {
  return (
    <TextField
      placeholder={placeholder}
      className={overrideClass ? overrideClass : classes.searchField}
      id="search-resource"
      label=""
      elemAfterInput={adornmentPosition === "end" ? <SearchIcon /> : null}
      elemBeforeInput={adornmentPosition === "start" ? <SearchIcon /> : null}
      onChange={(e) => {
        onChange((e.target as any).value);
      }}
      value={value}
    />
  );
};

export default withStyles(SearchBox, styles);
