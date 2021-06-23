import React from "react";
import { Story } from "@storybook/react";
import { HeroBanner, HeroBannerProps } from "../HeroBanner";

export default {
  title: "Header / HeroBanner",
  component: HeroBanner,
  argTypes: {},
};

const Template: Story<HeroBannerProps> = (args) => <HeroBanner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: "Building problem solvers, brick by brick.",
  copy:
    "As the leading learning centre for play-based therapy using LEGO®, we are dedicated to sharing best practices, new research and professional training to help children worldwide struggling with communication and social interaction.",
  componentAlignment: "Image left, text right",
  image: {
    fields: {
      title: "A couple walking through a forest",
      file: {
        url:
          "//images.ctfassets.net/ly9gc1zip4av/6h7qnHxVEg7l7m3fxPIW9F/6f0ed9e797e91d1fa89fa220702ddbd3/couple-walking-through-forest.jpeg",
      },
    },
  },
  imageOverlayType: "Brick pattern 1",
  imageOverlayPosition: "Left",
  imageOverlayColour: "Red",
  cta: {
    fields: {
      ctaText: "Learn more",
      linkType: "Internal link",
      ctaLink: {
        fields: {
          slug: "who-we-are",
          title: "Who we are",
        },
      },
      externalLink: "https://google.com/",
      mediaLink: {
        fields: {
          file: {
            url:
              "//assets.ctfassets.net/ly9gc1zip4av/7JsBos87pH9VDKw50WG2eF/63b04f60a0011aecfe105e5f1473a228/example.pdf",
          },
          title: "Example",
        },
      },
    },
  },
};
