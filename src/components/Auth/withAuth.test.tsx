import { render, screen } from "@/utils/testUtils";

import { mockedUserAuth } from "@/mocks/data/auth";
import withAuth from "./withAuth";

const mockRedirect = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: (route: string) => mockRedirect(route),
}));

const RouteContent = withAuth(() => <div>Route loaded</div>);

describe("withAuth", () => {
  it("doesn't show the route", async () => {
    render(<RouteContent />);

    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("shows the route", async () => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: mockedUserAuth(),
    });

    render(<RouteContent />);

    expect(screen.getByText("Route loaded")).toBeInTheDocument();
  });
});
