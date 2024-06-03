import { render, screen } from "@/utils/testUtils";
import * as auth from "@/utils/auth";
import { mockedUserAuth } from "@/mocks/data/auth";
import withAuth from "./withAuth";

const mockRedirect = jest.fn();

jest.mock("next/navigation", () => ({
  redirect: (route: string) => mockRedirect(route),
}));

jest.mock("next/headers", () => {
  return {
    cookies: () => {
      return {
        get: () => {},
      };
    },
  };
});

jest.mock("@/utils/language", () => ({
  getLocale: () => "en",
}));

const component = withAuth(() => <div>Route loaded</div>);

describe("withAuth", () => {
  it("doesn't show the route", async () => {
    jest.mock("@/utils/auth", () => ({
      getAuthData: () => ({}),
    }));

    //@ts-ignore
    render(await component());

    expect(mockRedirect).toHaveBeenCalledWith("/en/login");
  });

  it("shows the route", async () => {
    jest.mock("@/utils/auth", () => ({
      getAuthData: () => mockedUserAuth(),
    }));

    //@ts-ignore
    render(await component());

    expect(screen.getByText("Route loaded")).toBeInTheDocument();
  });
});
