import React from "react";
import CTA from "../CTA";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<CTA href="/" text="Some Text" />).toJSON();
  expect(tree).toMatchSnapshot();
});
