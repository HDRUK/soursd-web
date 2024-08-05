import { ROUTES } from "@/consts/router";
import { mockedUserAuth } from "@/mocks/data/auth";
import { isRouteAllowed } from "@/utils/router";
import { getAuthData } from "@/utils/auth";
import { render, screen, waitFor } from "@/utils/testUtils";
import withAuth from "./withAuth";

const mockRedirect = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: (route: string) => mockRedirect(route),
}));

jest.mock("next/headers", () => {
  return {
    headers: () => ({
      get: () => "/en/researcher/profile/details",
    }),
    cookies: () => {
      return {
        get: () => {},
      };
    },
  };
});

jest.mock("next-intl/server", () => ({
  getTranslations: () => ({
    ...jest.requireActual("next-intl/server"),
    rich: () => "",
  }),
}));

jest.mock("@/utils/router", () => ({
  isRouteAllowed: jest.fn(),
  getRoutes: () => ROUTES,
}));

jest.mock("@/utils/auth");

jest.mock("@/utils/language", () => ({
  getLocale: () => "en",
}));

const component = withAuth(() => <div>Route loaded</div>);

describe("withAuth", () => {
  beforeEach(() => {
    (isRouteAllowed as jest.Mock).mockReturnValue(true);
    (getAuthData as jest.Mock).mockReturnValue({});
  });

  it("doesn't show the route", async () => {
    jest.mock("@/utils/auth", () => ({
      getAuthData: () => ({}),
    }));

    render(await component());

    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("shows the route", async () => {
    (getAuthData as jest.Mock).mockReturnValue(mockedUserAuth());

    render(await component());

    await waitFor(() => {
      expect(screen.getByText("Route loaded")).toBeInTheDocument();
    });
  });

  it("shows an error", async () => {
    (isRouteAllowed as jest.Mock).mockReturnValue(false);
    (getAuthData as jest.Mock).mockReturnValue(mockedUserAuth());

    render(await component());

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });
});
