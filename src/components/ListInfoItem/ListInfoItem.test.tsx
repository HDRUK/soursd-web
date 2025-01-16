import { commonAccessibilityTests } from "@/utils/testUtils";
import { render } from "@testing-library/react";
import React from "react";
import ListInfoItem from "./ListInfoItem";

describe("<ListInfoItem />", () => {
  const renderListInfoItem = (children: React.ReactNode) =>
    render(<ListInfoItem index={1}>{children}</ListInfoItem>);

  it("renders children correctly", () => {
    const { getByText } = renderListInfoItem("Test Content");
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  commonAccessibilityTests(renderListInfoItem("Accessible Content"));
});
