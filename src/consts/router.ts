import { RoutePermissions, Routes } from "@/types/router";
import { UserGroup } from "./user";

const PROTECTED_ROUTES: RoutePermissions[] = [];

const ROUTES: Routes = {
  login: {
    path: "/login",
  },
  logout: {
    path: "/logout",
  },
  signup: {
    path: "/researcher/signup",
  },
  signupIssuer: {
    path: "/issuer/signup",
  },
  signupOrganistion: {
    path: "/organisation/signup",
  },
  homepage: {
    path: "/homepage",
  },
  profileIssuer: {
    path: "/issuer/profile",
    permissions: [UserGroup.ISSUERS],
  },
  usersIssuer: {
    path: "/issuer/users",
    permissions: [UserGroup.ISSUERS],
  },
  permissionsResearcherIssuer: {
    path: "/issuer/permissions/user",
    permissions: [UserGroup.ISSUERS],
  },
  permissionsOrganisationIssuer: {
    path: "/issuer/permissions/organisation",
    permissions: [UserGroup.ISSUERS],
  },
  profileResearcherExperience: {
    path: "/researcher/profile/experience",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherDetails: {
    path: "/researcher/profile/details",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherIdentity: {
    path: "/researcher/profile/identity",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherTraining: {
    path: "/researcher/profile/training",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherAffiliations: {
    path: "/researcher/profile/affiliations",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcher: {
    path: "/researcher/profile",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileOrganisation: {
    path: "/organisation/profile",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUser: {
    path: "/organisation/profile/user",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetails: {
    path: "/organisation/profile/details",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationContacts: {
    path: "/organisation/profile/contacts",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationApprovals: {
    path: "/organisation/profile/approvals",
    permissions: [UserGroup.ORGANISATIONS],
  },
  admin: {
    path: "/admin",
    key: "Admin",
    permissions: [UserGroup.ADMINS],
  },
};

export { PROTECTED_ROUTES, ROUTES };
