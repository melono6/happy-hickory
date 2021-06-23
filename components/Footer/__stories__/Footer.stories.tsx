import React from "react";
import { Story } from "@storybook/react";
import { Footer, FooterProps } from "../Footer";
import { props } from "../__fixtures__/Footer.props";

export default {
  title: "Footer / Footer",
  component: Footer,
  argTypes: {},
};

const Template: Story<FooterProps> = (args) => <Footer content={args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
