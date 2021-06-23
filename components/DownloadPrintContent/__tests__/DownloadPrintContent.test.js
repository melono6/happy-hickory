import React from "react";
import { render, screen } from "@testing-library/react";
import DownloadPrintContent from "../DownloadPrintContent";
import { props } from "../__fixtures__/DownloadPrintContent.props";

describe("<DownloadPrintContent />", () => {
  it("should contain download and print", () => {
    render(<DownloadPrintContent content={props} />);

    expect(screen.getByText(/download/i)).toBeInTheDocument();
    expect(screen.getByText(/print/i)).toBeInTheDocument();
  });

  it("download button should have a download attribute", () => {
    render(<DownloadPrintContent content={props} />);

    expect(screen.getByText(/download/i).closest("a")).toHaveAttribute(
      "download"
    );
  });
});
