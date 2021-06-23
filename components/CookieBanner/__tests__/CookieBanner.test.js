import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getCookie } from "@zepp/utils";
import CookieBanner from "../CookieBanner";
import { props } from "../__fixtures__/CookieBanner.props";

jest.mock("@zepp/utils");

describe("<CookieBanner />", () => {
  beforeEach(() => {
    getCookie.mockClear();
  });

  it("should contain 'cookie banner text'", () => {
    render(<CookieBanner content={props} />);

    expect(screen.getByText(/your privacy/i)).toBeInTheDocument();
  });

  it("should contain 'cookie policy link'", () => {
    render(<CookieBanner content={props} />);

    expect(
      screen.getByText(`${props.cookiePolicyLinkText}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${props.cookiePolicyLinkText}`).closest("a")
    ).toHaveAttribute("href", `/${props.cookiePolicyLink.fields.slug}`);
  });

  it("should contain 'accept cookies' button", () => {
    render(<CookieBanner content={props} />);

    expect(screen.getByText(/accept cookie/i)).toBeInTheDocument();
  });

  it("should appear if not already accepted cookie", () => {
    getCookie.mockReturnValueOnce(false);

    render(<CookieBanner content={props} />);

    expect(screen.getByText(/accept cookies/i)).toBeInTheDocument();
  });

  it("should not appear if already accepted cookie", () => {
    getCookie.mockReturnValueOnce(true);

    render(<CookieBanner content={props} />);

    expect(screen.queryByText(/accept cookies/i)).toBeNull();
  });

  it("should disappear when accepted cookie", async () => {
    getCookie.mockReturnValueOnce(false);

    render(<CookieBanner content={props} />);

    const button = screen.getByText(/accept cookies/i);

    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.queryByText(/accept cookies/i)).toBeNull()
    );
  });
});
