import React from "react";
import { Story } from "@storybook/react";
import { getCookie, setCookie } from "@zepp/utils";
import { CookieBanner, CookieBannerProps } from "../CookieBanner";
import { props } from "../__fixtures__/CookieBanner.props";

export default {
  title: "Global / CookieBanner",
  component: CookieBanner,
  argTypes: {},
};

const Template: Story<CookieBannerProps> = (args) => {
  const clearCookie = () => {
    const cookie = getCookie("cookieAccepted");
    if (cookie) {
      setCookie({
        cookieName: "cookieAccepted",
        value: "",
      });
    }
  };

  return (
    <div>
      <button onClick={clearCookie}>Clear cookie</button>
      <CookieBanner content={args} />
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  ...props,
};
