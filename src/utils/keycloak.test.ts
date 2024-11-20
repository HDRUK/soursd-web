import { handleLogin, handleLogout } from "@/utils/keycloak";

jest.mock("@/config/keycloak", () => ({
  authServerUrl: "https://keycloak.example.com",
  realm: "my-realm",
  clientId: "my-client-id",
  redirectUriLogin: "https://testapp.com/login-success",
  redirectUriLogout: "https://testapp.com/logout-success",
}));

describe("Keycloak Utils", () => {
  let originalLocation: Location;

  beforeEach(() => {
    // Save the original location object
    originalLocation = window.location;

    // Mock window.location
    delete (window as any).location;
    (window as any).location = {
      href: "",
    };
  });

  afterEach(() => {
    // Restore the original location object
    window.location = originalLocation;
  });

  it("should redirect to the correct URL on handleLogin", () => {
    handleLogin();

    const expectedUrl = `https://keycloak.example.com/realms/my-realm/protocol/openid-connect/auth?client_id=my-client-id&response_type=code&redirect_uri=https%3A%2F%2Ftestapp.com%2Flogin-success&scope=openid+profile+email`;
    expect(window.location.href).toBe(expectedUrl);
  });

  it("should redirect to the correct URL on handleLogout", () => {
    handleLogout();

    const expectedUrl = `https://keycloak.example.com/realms/my-realm/protocol/openid-connect/logout?client_id=my-client-id&post_logout_redirect_uri=https%3A%2F%2Ftestapp.com%2Flogout-success`;
    expect(window.location.href).toBe(expectedUrl);
  });
});
