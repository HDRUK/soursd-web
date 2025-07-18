import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import KeyFeatures from "./KeyFeatures";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("KeyFeatures Component", () => {
  beforeEach(() => {
    const mockT = jest.fn().mockReturnValue("TEST");
    (useTranslations as jest.Mock).mockReturnValue(mockT);
  });

  it("renders the main headings", () => {
    render(<KeyFeatures />);

    // Check the main heading
    expect(
      screen.getByRole("heading", { name: /Key Features/i })
    ).toBeInTheDocument();

    // Check the subheading
    expect(
      screen.getByText(
        /Capabilities for Users, Organisations, and Data Custodians/i
      )
    ).toBeInTheDocument();
  });

  it("renders all cards", () => {
    render(<KeyFeatures />);

    // Check the first item
    expect(
      screen.getByRole("heading", { name: /User and Organisation Registers/i })
    ).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        /A platform for Users \(researchers, analysts, students, others who access sensitive data\) and Organisations to create profiles and share relevant information for Data Custodians to assess if a person is ‘Safe’./i
      )[0]
    ).toBeInTheDocument();

    // Check the second item
    expect(
      screen.getByRole("heading", {
        name: /Visibility across Data Custodians/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        /Safe People Registry records Data Custodian approvals for previous and current projects as well as approvals for other functionality in complementary systems./i
      )[0]
    ).toBeInTheDocument();

    // Check the third item
    expect(
      screen.getByRole("heading", {
        name: /Multiple authentication routes/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        /Safe People Registry provides Single Sign-On \(SSO\) through multiple providers, such as; Google, LinkedIn and LSRI via Keycloak. This enables users to easily associate their Safe People Registry account with existing credentials./i
      )[0]
    ).toBeInTheDocument();
  });
});
