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
      name: /individuals/i,
    });
    const organisationButton = screen.getByRole("button", {
      name: /organisations/i,
    });
    const dataCustodianButton = screen.getByRole("button", {
      name: /data custodians/i,
    });

    expect(individualButton).toBeInTheDocument();
    expect(organisationButton).toBeInTheDocument();
    expect(dataCustodianButton).toBeInTheDocument();
  });

  it("ensures buttons have correct styling", () => {
    render(<Support />);
    const dataCustodianButton = screen.getByRole("button", {
      name: /data custodians/i,
    });

    // Mocked test to check the secondary button style
    expect(dataCustodianButton).toHaveClass("MuiButton-containedSecondary"); // Check for Material-UI styles
  });
});
