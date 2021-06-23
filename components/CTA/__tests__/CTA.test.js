import React from "react";
import { shallow } from "enzyme";
import CTA from "../CTA";

describe("<CTA />", () => {
  const props = {
    test: "TEST",
  };

  it("renders", () => {
    const wrapper = shallow(<CTA {...props} />);
    expect(wrapper.exists());
  });
});
