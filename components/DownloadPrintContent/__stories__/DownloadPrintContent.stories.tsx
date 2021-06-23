import React from "react";
import { Story } from "@storybook/react";
import {
  DownloadPrintContent,
  DownloadPrintContentProps,
} from "../DownloadPrintContent";
import { props } from "../__fixtures__/DownloadPrintContent.props";

export default {
  title: "Global / DownloadPrintContent",
  component: DownloadPrintContent,
  argTypes: {},
};

const Template: Story<DownloadPrintContentProps> = (args) => (
  <DownloadPrintContent content={args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
