import theme from "@/theme";
import {
  defineMatchMedia,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@/utils/testUtils";
import { axe } from "jest-axe";
import Header from "./Header";

const renderMobileMenuTest = () => {
  defineMatchMedia(theme.breakpoints.values.xs);

  const rendered = render(<Header />);

  expect(screen.queryByTestId("header-desktop-menu")).not.toBeInTheDocument();

  fireEvent.click(screen.getByLabelText("open mobile menu"));

  return rendered;
};

describe("<Header />", () => {
  it("displays the mobile menu and accessibility validates", async () => {
    const { container } = renderMobileMenuTest();

    await waitFor(() => {
      expect(screen.queryByTestId("header-mobile-menu")).toBeInTheDocument();
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("displays the desktop menu and accessibility validates", async () => {
    defineMatchMedia(theme.breakpoints.values.sm);

    const { container } = render(<Header />);

    expect(screen.queryByTestId("header-desktop-menu")).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("closes the mobile menu", async () => {
    renderMobileMenuTest();

    fireEvent.click(screen.getByLabelText("close mobile menu"));

    await waitFor(() => {
      expect(
        screen.queryByTestId("header-mobile-menu")
      ).not.toBeInTheDocument();
    });
  });
});
