import { getRoutes } from "./router";

describe("Route utils", () => {
  describe("getRoutes", () => {
    it("get localled routes", () => {
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
});
