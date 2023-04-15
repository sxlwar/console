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

import { Meta, Story } from "@storybook/react";
import React from "react";

import List, { ListItem } from "./List";
import { ListProps } from "./List.types";

import StoryThemeProvider from "../../utils/StoryThemeProvider";
import GlobalStyles from "../GlobalStyles/GlobalStyles";
import AddIcon from "../Icons/AddIcon";

export default {
  title: "MDS/Layout/List",
  component: List,
  argTypes: {},
} as Meta<typeof List>;

const Template: Story<ListProps> = (args) => (
  <StoryThemeProvider>
    <GlobalStyles />
    <List>
      <ListItem>a</ListItem>
      <ListItem>b</ListItem>
      <ListItem>c</ListItem>
    </List>

    <List>
      <ListItem>
        <AddIcon />
        some text
      </ListItem>
    </List>
  </StoryThemeProvider>
);

export const Default = Template.bind({});
Default.args = {};
