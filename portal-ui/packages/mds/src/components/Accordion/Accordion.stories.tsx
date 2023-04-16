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

import { Meta, Story } from "@storybook/react";
import React from "react";

import Accordion from "./Accordion";
import { AccordionProps } from "./Accordion.types";

import StoryThemeProvider from "../../utils/StoryThemeProvider";

export default {
  title: "MDS/Layout/Accordion",
  component: Accordion,
  argTypes: {},
} as Meta<typeof Accordion>;

const Template: Story<AccordionProps> = (args) => (
  <StoryThemeProvider>
    <Accordion {...args} />
  </StoryThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  summary: 'Summary area',
  detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, doloribus eveniet ab placeat corporis molestiae distinctio ipsam nihil atque illo consequatur ullam error non soluta dolore, quod sequi sint a?',
};
