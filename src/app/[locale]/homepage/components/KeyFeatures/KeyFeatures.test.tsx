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

  it("renders all carousel items", () => {
    render(<KeyFeatures />);

    // Check the first carousel item
    expect(
      screen.getByRole("heading", { name: /User and Organisation Registers/i })
    ).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        /A centralised ‘Know Your User and Organisation’ system for individual Researchers and Organisations to create profiles and share relevant information for Data Custodians to assess if a person is ‘Safe’/i
      )[0]
    ).toBeInTheDocument();

    // Check the second carousel item
    expect(
      screen.getByRole("heading", {
        name: /Visibility across Data Custodians/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        /Records Data Custodian approvals for previous and current projects as well as approvals for other functionality in complementary systems./i
      )[0]
    ).toBeInTheDocument();

    // Check the third carousel item
    expect(
      screen.getByRole("heading", {
        name: /Single Sign-On through multiple authentication routes/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        /Provides a mechanism to associate a SOURSD account with other accounts e.g. Health Data research Gateway account./i
      )[0]
    ).toBeInTheDocument();
  });
});
