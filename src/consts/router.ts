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
  permissionsResearcherIssuer: {
    path: "/issuer/permissions/user/",
    key: "PermissionsResearcherIssuer",
  },
  permissionsOrganisationIssuer: {
    path: "/issuer/permissions/organisation/",
    key: "PermissionsOrganisationIssuer",
  },
  profileResearcher: {
    path: "/researcher/profile",
    key: "Profile",
  },
  profileOrganisation: {
    path: "/organisation/profile",
    key: "Profile",
  },
};

export { PROTECTED_ROUTES, ROUTES };
