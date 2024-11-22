import theme from "@/theme";
import {
  defineMatchMedia,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import NavBar from "./NavBar";

const renderMobileMenuTest = () => {
  defineMatchMedia(theme.breakpoints.values.xs);

  const rendered = render(<NavBar />);

  fireEvent.click(screen.getByLabelText("open mobile menu"));

  return rendered;
};

describe("NavBar", () => {
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

  it("renders the SourcdLogo component", async () => {
    render(<NavBar />);
    const logo = screen.getAllByRole("img", { name: "SOURCD" });

    await waitFor(() => {
      expect(logo[0]).toBeInTheDocument();
    });
  });

  it("renders the Divider component", () => {
    render(<NavBar />);
    const divider = screen.getByRole("separator");
    expect(divider).toBeInTheDocument();
  });

  it("shows the mobile menu", async () => {
    renderMobileMenuTest();
    const mobileNav = screen.getByTestId("header-mobile-menu");

    await waitFor(() => {
      expect(mobileNav).toBeInTheDocument();
    });
  });
});
