import React from "react";
import { Story } from "@storybook/react";
import { CTA, CTAProps } from "../CTA";

export default {
  title: "Global / CTAs",
  component: CTA,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: ["Primary", "Secondary"],
      },
    },
    size: {
      control: {
        type: "select",
        options: [1, 2, 3],
      },
    },
  },
};

const Template: Story<CTAProps> = (args) => <CTA {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  href: "/",
  theme: "Primary",
  text: "Primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  href: "/",
  theme: "Secondary",
  text: "Secondary",
};

export const FullWidthAndPrimary = Template.bind({});
FullWidthAndPrimary.args = {
  href: "/",
  theme: ["FullWidth", "Primary"],
  text: "Full width & primary",
};

export const Small = Template.bind({});
Small.args = {
  href: "/",
  text: "Small",
};

export const Medium = Template.bind({});
Medium.args = {
  href: "/",
  text: "Medium",
};

export const PrimaryAndLarge = Template.bind({});
PrimaryAndLarge.args = {
  href: "/",
  theme: "Primary",
  text: "Primary & large",
};
