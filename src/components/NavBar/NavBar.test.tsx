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

const translations = {
  homeButton: "Home",
  aboutButton: "About",
  featuresButton: "Features",
  supportButton: "Support",
  contactButton: "Contact",
  signInButton: "Sign In",
  registerButton: "Register",
};

describe("NavBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the NavBar with buttons", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);

    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => undefined),
    });

    render(<NavBar />);

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

    fireEvent.click(screen.getByText("signInButton"));

    expect(handleLogin).toHaveBeenCalled();
  });

  it("calls handleLogout on signOutButton click when authenticated", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => "mockAccessToken"),
    });

    render(<NavBar />);

    fireEvent.click(screen.getByText("signOutButton"));

    expect(handleLogout).toHaveBeenCalled();
  });

  it("displays 'signOutButton' if the user is authenticated", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => "mockAccessToken"),
    });

    render(<NavBar />);

    expect(screen.getByText("signOutButton")).toBeInTheDocument();
  });

  it("displays 'signInButton' if the user is not authenticated", () => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
    (useCookies as jest.Mock).mockReturnValue({
      getCookie: jest.fn(() => undefined),
    });

    render(<NavBar />);

    expect(screen.getByText("signInButton")).toBeInTheDocument();
  });

  it.each(Object.keys(translations))(
    "displays all the buttons with correct translations",
    value => {
      (useTranslations as jest.Mock).mockReturnValue((key: string) => key);

      (useCookies as jest.Mock).mockReturnValue({
        getCookie: jest.fn(() => undefined),
      });

      render(<NavBar />);
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  );
});
