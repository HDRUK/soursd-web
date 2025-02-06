import { mockedJwt } from "@/mocks/data/auth";
import theme from "@/theme";
import { handleLogin, handleLogout } from "@/utils/keycloak";
import {
  defineMatchMedia,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { get } from "js-cookie";
import NavBar from "./NavBar";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

jest.mock("@/utils/keycloak", () => ({
  handleLogin: jest.fn(),
  handleLogout: jest.fn(),
}));

(get as jest.Mock).mockReturnValue(undefined);

const linksText = ["Home", "About", "Features", "Support", "Contact"];

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

  it.each(linksText)("renders nav item %s", name => {
    render(<NavBar />);

    expect(
      screen.getByRole("link", {
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
    (get as jest.Mock).mockReturnValue(mockedJwt);

    render(<NavBar />);

    fireEvent.click(screen.getByRole("button", { name: "Sign Out" }));

    expect(handleLogout).toHaveBeenCalled();
  });

  it("displays 'Sign Out' if the user is authenticated", () => {
    (get as jest.Mock).mockReturnValue(mockedJwt);

    render(<NavBar />);

    expect(
      screen.getByRole("button", {
        name: "Sign Out",
      })
    ).toBeInTheDocument();
  });
});
