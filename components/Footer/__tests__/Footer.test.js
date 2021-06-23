import React from "react";
import { screen, render } from "@testing-library/react";
import Footer from "../Footer";
import { props } from "../__fixtures__/Footer.props";

describe("<Footer />", () => {
  it("should contain 'contact us'", () => {
    render(<Footer content={props} />);

    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });

  it("should contain 'social icons'", () => {
    render(<Footer content={props} />);

    expect(screen.getByAltText(/linkedin/i)).toBeInTheDocument();
    expect(screen.getByAltText(/twitter/i)).toBeInTheDocument();
  });

  it("should contain 'footer links'", () => {
    render(<Footer content={props} />);

    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
    expect(screen.getByText(/cookie policy/i)).toBeInTheDocument();
    expect(screen.getByText(/conditions/i)).toBeInTheDocument();
    expect(screen.getByText(/accessibility/i)).toBeInTheDocument();
  });

  it("should contain 'charity text'", () => {
    render(<Footer content={props} />);

    expect(screen.getByText(`${props.theArtInformation}`)).toBeInTheDocument();
  });

  it("should contain 'copyright text'", () => {
    render(<Footer content={props} />);

    expect(screen.getByText(`${props.copyrightText}`)).toBeInTheDocument();
  });

  it("should contain a clickable logo", () => {
    render(<Footer content={props} />);

    expect(
      screen.getByAltText(`${props.charity.fields.charityTitle}`).closest("a")
    ).toHaveAttribute("href", `${props.charity.fields.charityLink}`);
  });
});
