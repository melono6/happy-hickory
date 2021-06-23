import React from "react";
import { Story } from "@storybook/react";
import { Embed, EmbedProps } from "../Embed";

export default {
  title: "Body / Embed",
  component: Embed,
  argTypes: {},
};

const Template: Story<EmbedProps> = (args) => (
  <Embed embedCode={args.embedCode} />
);

export const Vimeo = Template.bind({});
Vimeo.args = {
  embedCode:
    '<iframe src="https://player.vimeo.com/video/510614745?color=ffffff&title=0&byline=0&portrait=0&badge=0" width="640" height="347" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>',
};

export const YouTube = Template.bind({});
YouTube.args = {
  embedCode:
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/rJdHvKWvk3Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
};
