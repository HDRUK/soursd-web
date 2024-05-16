import { RoutePermissions } from "@/types/router";

const PROTECTED_ROUTES: RoutePermissions[] = [];

const ROUTES = {
  signup: {
    path: "/signup",
    key: "Signup",
  },
  signupIssuer: {
    path: "/signup-issuer",
    key: "SignupIssuer",
  },
  homepage: {
    path: "/homepage",
    key: "Homepage",
  },
  profileIssuer: {
    path: "/issuer/profile",
    key: "ProfileIssuer",
  },
};

export { PROTECTED_ROUTES, ROUTES };
