import { RoutePermissions } from "@/types/router";

const PROTECTED_ROUTES: RoutePermissions[] = [];

const ROUTES = {
  login: {
    path: "/login",
    key: "Login",
  },
  signup: {
    path: "/researcher/signup",
    key: "Signup",
  },
  signupIssuer: {
    path: "/issuer/signup",
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
  profileResearcher: {
    path: "/researcher/profile",
    key: "Profile",
  },
};

export { PROTECTED_ROUTES, ROUTES };
