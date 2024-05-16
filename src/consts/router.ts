import { RoutePermissions } from "@/types/router";

const PROTECTED_ROUTES: RoutePermissions[] = [];

const ROUTES = {
  signup: {
    path: "/signup",
  },
  signupIssuer: {
    path: "/signup-issuer",
  },
  homepage: {
    path: "/homepage",
  },
  profileIssuer: {
    path: "/issuer/profile",
  },
};

export { PROTECTED_ROUTES, ROUTES };
