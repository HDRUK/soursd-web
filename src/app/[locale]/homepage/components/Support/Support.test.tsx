import { render, screen } from "@testing-library/react";
import Support from "./Support";

describe("Support Component", () => {
  it("renders the Support heading", () => {
    render(<Support />);
    const heading = screen.getByRole("heading", { name: /support/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders all buttons with correct text", () => {
    render(<Support />);
    const individualButton = screen.getByRole("button", {
      name: /individual users/i,
    });
    const organisationButton = screen.getByRole("button", {
      name: /organisations/i,
    });
    const custodianButton = screen.getByRole("button", {
      name: /data custodians/i,
    });

    expect(individualButton).toBeInTheDocument();
    expect(organisationButton).toBeInTheDocument();
    expect(custodianButton).toBeInTheDocument();
  });

  it("ensures buttons have correct styling", () => {
    render(<Support />);
    const custodianButton = screen.getByRole("button", {
      name: /data custodians/i,
    });

    // Mocked test to check the primary button style
    expect(custodianButton).toHaveClass("MuiButton-outlinedPrimary"); // Check for Material-UI styles
  });
});
