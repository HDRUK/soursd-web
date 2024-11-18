import React from "react";
import { render, screen } from "@testing-library/react";
import SoursdUsages from "./SoursdUsages";

// Mock the Material-UI and icon components
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  Typography: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="typography">{children}</div>
  ),
}));

jest.mock("@mui/icons-material/DoneAllOutlined", () => () => (
  <svg data-testid="done-icon" />
));

// Mock the styled components
jest.mock("./SoursdUsages.styles", () => ({
  StyledContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="styled-content">{children}</div>
  ),
  StyledContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="styled-container">{children}</div>
  ),
  StyledGrid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="styled-grid">{children}</div>
  ),
  StyledBox: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="styled-box">{children}</div>
  ),
}));

describe("SoursdUsages Component", () => {
  it("renders the component correctly with mocked data", () => {
    render(<SoursdUsages />);

    // Verify the main container
    expect(screen.getByTestId("styled-container")).toBeInTheDocument();

    // Verify the header content
    expect(screen.getByText("With SOURSD you can...")).toBeInTheDocument();

    // Verify the grid container
    expect(screen.getByTestId("styled-grid")).toBeInTheDocument();

    // Verify each usage item
    const usageTexts = [
      "Accelerate ‘Safe People’ data access",
      "Reduce duplication of effort for Users and Organisations",
      "Enable shared intelligence across Data Custodians",
    ];
    usageTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    // Verify icons are present
    const icons = screen.getAllByTestId("done-icon");
    expect(icons).toHaveLength(3); // Ensure three icons are rendered
  });
});
