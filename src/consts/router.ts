import { RoutePermissions, Routes } from "@/types/router";
import { UserGroup } from "./user";

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
    permissions: [UserGroup.ISSUERS],
  },
  permissionsResearcherIssuer: {
    path: "/issuer/permissions/user",
    key: "PermissionsResearcherIssuer",
    permissions: [UserGroup.ISSUERS],
  },
  permissionsOrganisationIssuer: {
    path: "/issuer/permissions/organisation",
    key: "PermissionsOrganisationIssuer",
    permissions: [UserGroup.ISSUERS],
  },
  profileResearcherExperience: {
    path: "/researcher/profile/experience",
    key: "ProfileExperience",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherDetails: {
    path: "/researcher/profile/details",
    key: "ProfileDetails",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherIdentity: {
    path: "/researcher/profile/identity",
    key: "ProfileIdentity",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherTraining: {
    path: "/researcher/profile/training",
    key: "ProfileTraining",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherAffiliations: {
    path: "/researcher/profile/affiliations",
    key: "ProfileAffiliations",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcher: {
    path: "/researcher/profile",
    key: "Profile",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileOrganisation: {
    path: "/organisation/profile",
    key: "Profile",
    permissions: [UserGroup.ORGANISATIONS],
  },
  admin: {
    path: "/admin",
    key: "Admin",
    permissions: [UserGroup.ADMINS],
  },
};

export { PROTECTED_ROUTES, ROUTES };
