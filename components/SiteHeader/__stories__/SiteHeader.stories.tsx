import React from "react";
import { Story } from "@storybook/react";
import { SiteHeader, SiteHeaderProps } from "../SiteHeader";
import { props } from "../__fixtures__/SiteHeader.props";

export default {
  title: "Header / SiteHeader",
  component: SiteHeader,
  argTypes: {},
};

const Template: Story<SiteHeaderProps> = (args) => (
  <SiteHeader content={args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
