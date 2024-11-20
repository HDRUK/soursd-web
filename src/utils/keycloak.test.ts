import { handleLogin, handleLogout } from "@/utils/keycloak";

jest.mock("@/config/keycloak", () => ({
  authServerUrl: "https://keycloak.example.com",
  realm: "my-realm",
  clientId: "my-client-id",
  redirectUriLogin: "https://test.com/login-success",
  redirectUriLogout: "https://test.com/logout-success",
}));

describe("Keycloak Utils", () => {
  let originalLocation: Location;
  let mockLocation: Pick<Location, "href">;

  beforeEach(() => {
    // Save the original location object
    originalLocation = window.location;

    // Create a mock location object
    mockLocation = {
      href: "",
    };

    // Replace window.location with the mock
    Object.defineProperty(window, "location", {
      configurable: true,
      value: mockLocation,
    });
  });

  afterEach(() => {
    // Restore the original location object
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("should redirect to the correct URL on handleLogin", () => {
    handleLogin();

    const expectedUrl = `https://keycloak.example.com/realms/my-realm/protocol/openid-connect/auth?client_id=my-client-id&response_type=code&redirect_uri=https%3A%2F%2Ftest.com%2Flogin-success&scope=openid+profile+email`;
    expect(mockLocation.href).toBe(expectedUrl);
  });

  it("should redirect to the correct URL on handleLogout", () => {
    handleLogout();

    const expectedUrl = `https://keycloak.example.com/realms/my-realm/protocol/openid-connect/logout?client_id=my-client-id&post_logout_redirect_uri=https%3A%2F%2Ftest.com%2Flogout-success`;
    expect(mockLocation.href).toBe(expectedUrl);
  });
});
