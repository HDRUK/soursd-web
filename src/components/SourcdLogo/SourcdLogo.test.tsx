import React from "react";
import { render } from "@testing-library/react";
import SourcdLogo, { SourcdLogoProps } from "./SourcdLogo";

describe("SourcdLogo Component", () => {
  const defaultProps: SourcdLogoProps = {
    className: "custom-class",
  };

  it("renders without crashing", () => {
    const { getByAltText, getByText } = render(
      <SourcdLogo {...defaultProps} />
    );
    const logoImage = getByAltText("SOURCD");
    const heading = getByText("SOURCD");

    expect(logoImage).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });

  it("applies the className prop", () => {
    const { container } = render(<SourcdLogo {...defaultProps} />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("displays the heading with the correct text", () => {
    const { getByText } = render(<SourcdLogo {...defaultProps} />);
    const heading = getByText("SOURCD");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("heading");
  });
});
