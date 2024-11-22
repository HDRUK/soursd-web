import { useCookies } from "@/context/CookieContext/CookieContext";
import { handleLogin, handleLogout } from "@/utils/keycloak";
import {
  defineMatchMedia,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import NavBar from "./NavBar";
import theme from "@/theme";

jest.mock("@/context/CookieContext/CookieContext", () => ({
  useCookies: jest.fn(),
}));

jest.mock("@/utils/keycloak", () => ({
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
}));

const mockGetCookie = jest.fn().mockReturnValue(undefined);

(useCookies as jest.Mock).mockReturnValue({
  getCookie: mockGetCookie,
});

const buttonsText = [
  "Home",
  "About",
  "Features",
  "Support",
  "Contact",
  "Sign In",
  "Register",
];

const renderMobileMenuTest = () => {
  defineMatchMedia(theme.breakpoints.values.xs);

  const rendered = render(<NavBar />);

  fireEvent.click(screen.getByLabelText("open mobile menu"));

  return rendered;
};

describe("NavBar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each(buttonsText)("renders nav item %s", name => {
    render(<NavBar />);

    expect(
      screen.getByRole("button", {
        name,
      })
    ).toBeInTheDocument();
  });

  it("calls handleLogin on Sign In click when not authenticated", () => {
    render(<NavBar />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Sign In",
      })
    );

    expect(handleLogin).toHaveBeenCalled();
  });

  it("displays 'Sign In' if the user is not authenticated", () => {
    render(<NavBar />);

    expect(
      screen.getByRole("button", {
        name: "Sign In",
      })
    ).toBeInTheDocument();
  });

  it("shows the mobile menu", async () => {
    renderMobileMenuTest();

    const mobileNav = screen.getByTestId("header-mobile-menu");

    await waitFor(() => {
      expect(mobileNav).toBeInTheDocument();
    });
  });

  it("calls handleLogout on 'Sign Out' click when authenticated", () => {
    mockGetCookie.mockReturnValue("mockAccessToken");

    render(<NavBar />);

    fireEvent.click(screen.getByRole("button", { name: "Sign Out" }));

    expect(handleLogout).toHaveBeenCalled();
  });

  it("displays 'Sign Out' if the user is authenticated", () => {
    mockGetCookie.mockReturnValue("mockAccessToken");

    render(<NavBar />);

    expect(
      screen.getByRole("button", {
        name: "Sign Out",
      })
    ).toBeInTheDocument();
  });
});
