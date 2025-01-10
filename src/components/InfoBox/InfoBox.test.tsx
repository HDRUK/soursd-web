import React from "react";
import { render, act } from "@testing-library/react";
import { axe } from "jest-axe";
import InfoBox from "./InfoBox";

describe("<InfoBox />", () => {
  const renderInfoBox = (children: React.ReactNode) =>
    render(<InfoBox index={1}>{children}</InfoBox>);

  it("renders children correctly", () => {
    const { getByText } = renderInfoBox("Test Content");
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderInfoBox("Accessible Content");

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
