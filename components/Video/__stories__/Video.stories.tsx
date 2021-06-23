import React from "react";
import { Story } from "@storybook/react";
import { VideoPlayer, VideoProps } from "../Video";
import { props } from "../__fixtures__/Video.props";

export default {
  title: "Body / VideoPlayer",
  component: VideoPlayer,
  argTypes: {},
};

const Template: Story<VideoProps> = (args) => <VideoPlayer content={args} />;

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
