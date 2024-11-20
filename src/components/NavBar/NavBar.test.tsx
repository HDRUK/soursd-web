import { render, screen, fireEvent } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { useCookies } from "@/context/CookieContext/CookieContext";
import { handleLogin, handleLogout } from "@/utils/keycloak";
import NavBar from "./NavBar";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/context/CookieContext/CookieContext", () => ({
  useCookies: jest.fn(),
}));

jest.mock("@/utils/keycloak", () => ({
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
}));

describe("NavBar Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it("renders the NavBar with buttons", () => {
    // Mock translation function
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);

    // Mock cookies (if the user is not authenticated)
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => undefined),
    });

    render(<NavBar />);

    // Check if buttons are rendered
    expect(screen.getByText("homeButton")).toBeInTheDocument();
    expect(screen.getByText("aboutButton")).toBeInTheDocument();
    expect(screen.getByText("featuresButton")).toBeInTheDocument();
    expect(screen.getByText("supportButton")).toBeInTheDocument();
    expect(screen.getByText("contactButton")).toBeInTheDocument();
    expect(screen.getByText("signInButton")).toBeInTheDocument();
    expect(screen.getByText("registerButton")).toBeInTheDocument();
  });

  it("calls handleLogin on signInButton click when not authenticated", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => undefined),
    });

    render(<NavBar />);

    // Click the Sign In button
    fireEvent.click(screen.getByText("signInButton"));

    // Ensure handleLogin is called
    expect(handleLogin).toHaveBeenCalled();
  });

  it("calls handleLogout on signOutButton click when authenticated", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => "mockAccessToken"),
    });

    render(<NavBar />);

    // Click the Sign Out button
    fireEvent.click(screen.getByText("signOutButton"));

    // Ensure handleLogout is called
    expect(handleLogout).toHaveBeenCalled();
  });

  it("displays 'signOutButton' if the user is authenticated", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => "mockAccessToken"),
    });

    render(<NavBar />);

    // Check if the 'signOutButton' is displayed
    expect(screen.getByText("signOutButton")).toBeInTheDocument();
  });

  it("displays 'signInButton' if the user is not authenticated", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => undefined),
    });

    render(<NavBar />);

    // Check if the 'signInButton' is displayed
    expect(screen.getByText("signInButton")).toBeInTheDocument();
  });

  it("displays all the buttons with correct translations", () => {
    const translations = {
      homeButton: "Home",
      aboutButton: "About",
      featuresButton: "Features",
      supportButton: "Support",
      contactButton: "Contact",
      signInButton: "Sign In",
      registerButton: "Register",
    };

    (useTranslations as jest.Mock).mockReturnValue(
      (key: string) => translations[key]
    );
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => undefined),
    });

    render(<NavBar />);

    // Check if the buttons render the correct translation
    Object.values(translations).forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });
});
