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
  register: {
    path: "/register",
  },
  homepage: {
    path: "/homepage",
  },
  profileIssuer: {
    path: "/data-custodian/profile",
    permissions: [UserGroup.ISSUERS],
  },
  usersIssuer: {
    path: "/data-custodian/users",
    permissions: [UserGroup.ISSUERS],
  },
  permissionsResearcherIssuer: {
    path: "/data-custodian/permissions/user",
    permissions: [UserGroup.ISSUERS],
  },
  permissionsOrganisationIssuer: {
    path: "/data-custodian/permissions/organisation",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerDetails: {
    path: "/data-custodian/profile/details",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerConfiguration: {
    path: "/data-custodian/profile/configuration",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerUsers: {
    path: "/data-custodian/profile/users",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerKeycards: {
    path: "/data-custodian/profile/keycards",
    permissions: [UserGroup.ISSUERS],
  },
  profileResearcherExperience: {
    path: "/user/profile/experience",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherDetails: {
    path: "/user/profile/details",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherCompletion: {
    path: "/user/profile/completion",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherIdentity: {
    path: "/user/profile/identity",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherTraining: {
    path: "/user/profile/training",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcherAffiliations: {
    path: "/user/profile/affiliations",
    permissions: [UserGroup.RESEARCHERS],
  },
  profileResearcher: {
    path: "/user/profile",
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
