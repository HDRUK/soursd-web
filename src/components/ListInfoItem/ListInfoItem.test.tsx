import React from "react";
import { render, act } from "@testing-library/react";
import { axe } from "jest-axe";
import ListInfoItem from "./ListInfoItem";

describe("<ListInfoItem />", () => {
  const renderListInfoItem = (children: React.ReactNode) =>
    render(<ListInfoItem index={1}>{children}</ListInfoItem>);

  it("renders children correctly", () => {
    const { getByText } = renderListInfoItem("Test Content");
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderListInfoItem("Accessible Content");

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });
});
