import { RoutePermissions, Routes } from "@/types/router";

const PROTECTED_ROUTES: RoutePermissions[] = [];

const ROUTES: Routes = {
  login: {
    path: "/login",
    key: "Login",
  },
  logout: {
    path: "/logout",
    key: "Logout",
  },
  signup: {
    path: "/researcher/signup",
    key: "Signup",
  },
  signupIssuer: {
    path: "/issuer/signup",
    key: "SignupIssuer",
  },
  signupOrganistion: {
    path: "/organisation/signup",
    key: "SignupOrgnisation",
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
    path: "/issuer/permissions/user",
    key: "PermissionsResearcherIssuer",
  },
  permissionsOrganisationIssuer: {
    path: "/issuer/permissions/organisation",
    key: "PermissionsOrganisationIssuer",
  },
  profileResearcherExperience: {
    path: "/researcher/profile/experience",
    key: "ProfileExperience",
  },
  profileResearcherDetails: {
    path: "/researcher/profile/details",
    key: "ProfileDetails",
  },
  profileResearcherIdentity: {
    path: "/researcher/profile/identity",
    key: "ProfileIdentity",
  },
  profileResearcherTraining: {
    path: "/researcher/profile/training",
    key: "ProfileTraining",
  },
  profileResearcherAffiliations: {
    path: "/researcher/profile/affiliations",
    key: "ProfileAffiliations",
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
