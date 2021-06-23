import React from "react";
import { Story } from "@storybook/react";
import { Spacer, SpacerProps } from "../Spacer";
import { props } from "../__fixtures__/Spacer.props";

export default {
  title: "Body / Spacer",
  component: Spacer,
  argTypes: {
    imageColour: {
      control: {
        type: "select",
        options: ["Red", "Blue", "Green", "Peach"],
      },
    },
    imagePosition: {
      control: {
        type: "select",
        options: ["Left", "Center", "Right"],
      },
    },
    imageType: {
      control: {
        type: "select",
        options: ["Dots1", "Dots2", "Dots3", "Dots4", "Bricks4", "Bricks6"],
      },
    },
  },
};

const Template: Story<SpacerProps> = (args) => <Spacer content={args} />;

export const Dots1 = Template.bind({});
Dots1.args = {
  ...props,
};

export const Dots2 = Template.bind({});
Dots2.args = {
  ...props,
  imageType: "Dots2",
};

export const Dots3 = Template.bind({});
Dots3.args = {
  ...props,
  imageType: "Dots3",
};

export const Dots4 = Template.bind({});
Dots4.args = {
  ...props,
  imageType: "Dots4",
};

export const Bricks4 = Template.bind({});
Bricks4.args = {
  ...props,
  imageType: "Bricks4",
};

export const Bricks6 = Template.bind({});
Bricks6.args = {
  ...props,
  imageType: "Bricks6",
};
