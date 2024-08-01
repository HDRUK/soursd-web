import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { mockedUserAuth } from "@/mocks/data/auth";
import { mockedUser } from "@/mocks/data/user";
import { getRoutes, isRouteAllowed } from "./router";

describe("Route utils", () => {
  describe("getRoutes", () => {
    it("get locallled routes", () => {
      expect(
        getRoutes(
          {
            login: {
              path: "/login",
              key: "Login",
            },
          },
          "en"
        )
      ).toEqual({
        login: {
          path: "/en/login",
          key: "Login",
        },
      });
    });
  });

  describe("isRouteAllowed", () => {
    it("is allowed", async () => {
      const auth = mockedUserAuth({
        user: mockedUser({
          user_group: UserGroup.RESEARCHERS,
        }),
      });

      expect(
        isRouteAllowed("/researcher/profile/details", ROUTES, auth)
      ).toEqual(true);
    });

    it("is allowed", async () => {
      const auth = mockedUserAuth({
        user: mockedUser({
          user_group: UserGroup.ORGANISATIONS,
        }),
      });

      expect(
        isRouteAllowed("/researcher/profile/details", ROUTES, auth)
      ).toEqual(false);
    });
  });
});
