import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import NavBar from "./NavBar";

// Mock the useTranslations hook
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("NavBar", () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        homeButton: "Home",
        aboutButton: "About",
        featuresButton: "Features",
        supportButton: "Support",
        contactButton: "Contact",
        signInButton: "Sign In",
        registerButton: "Register",
      };
      return translations[key] || key;
    });
  });

  it("renders NavBar with correct buttons and properties", () => {
    render(<NavBar />);

    // Check that the buttons render with the correct text
    const buttons = [
      { text: "Home", color: "inherit", variant: "text" },
      { text: "About", color: "inherit", variant: "text" },
      { text: "Features", color: "inherit", variant: "text" },
      { text: "Support", color: "inherit", variant: "text" },
      { text: "Contact", color: "inherit", variant: "text" },
      { text: "Sign In", color: "secondary", variant: "contained" },
      { text: "Register", color: "primary", variant: "contained" },
    ];

    buttons.forEach(button => {
      const renderedButton = screen.getByText(button.text);
      expect(renderedButton).toBeInTheDocument();
    });
  });

  it("renders the SourcdLogo component", () => {
    render(<NavBar />);
    const logo = screen.getByRole("img", { name: "SOURCD" });
    expect(logo).toBeInTheDocument();
  });

  it("renders the Divider component", () => {
    render(<NavBar />);
    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
  });
});
