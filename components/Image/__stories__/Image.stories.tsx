import React from "react";
import { Story } from "@storybook/react";
import { Image, ImageProps } from "../Image";

export default {
  title: "Global / Image",
  component: Image,
  argTypes: {},
};

const Template: Story<ImageProps> = (args) => <Image {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src:
    "//images.ctfassets.net/ly9gc1zip4av/6h7qnHxVEg7l7m3fxPIW9F/6f0ed9e797e91d1fa89fa220702ddbd3/couple-walking-through-forest.jpeg",
  alt: "A couple walking through a forest",
  width: 708,
  height: 528,
  cropFocus: "faces",
  eager: true,
};
