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
  profileIssuerDetails: {
    path: "/issuer/profile/details",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerProjects: {
    path: "/issuer/profile/projects",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerOrganisations: {
    path: "/issuer/profile/organisations",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerConfiguration: {
    path: "/issuer/profile/configuration",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerUsers: {
    path: "/issuer/profile/users",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerKeycards: {
    path: "/issuer/profile/keycards",
    permissions: [UserGroup.ISSUERS],
  },
  profileResearcherExperience: {
    path: "/researcher/profile/experience",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherCompletion: {
    path: "/researcher/profile/completion",
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
  profileResearcherDetails: {
    path: "/researcher/profile/details",
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
  profileOrganisationUsers: {
    path: "/organisation/profile/approvals",
    permissions: [UserGroup.ORGANISATIONS],
  },
  admin: {
    path: "/admin",
    permissions: [UserGroup.ADMINS],
  },
};

export { PROTECTED_ROUTES, ROUTES };
