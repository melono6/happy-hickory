import React from "react";
import { Story } from "@storybook/react";
import { RichText, RichTextProps } from "../RichText";
import { props } from "../__fixtures__/RichText.props";

export default {
  title: "Global / RichText",
  component: RichText,
  argTypes: {},
};

const Template: Story<RichTextProps> = (args) => <RichText content={args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
