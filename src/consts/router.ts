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
  profileCustodian: {
    path: "/data-custodian/profile",
    permissions: [UserGroup.ISSUERS],
  },
  usersCustodian: {
    path: "/data-custodian/users",
    permissions: [UserGroup.ISSUERS],
  },
  permissionsResearcherCustodian: {
    path: "/data-custodian/permissions/user",
    permissions: [UserGroup.ISSUERS],
  },
  permissionsOrganisationCustodian: {
    path: "/data-custodian/permissions/organisation",
    permissions: [UserGroup.ISSUERS],
  },
  profileCustodianDetails: {
    path: "/data-custodian/profile/details",
    permissions: [UserGroup.ISSUERS],
  },
  profileCustodianProjects: {
    path: "/data-custodian/profile/projects",
    permissions: [UserGroup.ISSUERS],
  },
  profileCustodianOrganisations: {
    path: "/data-custodian/profile/organisations",
    permissions: [UserGroup.ISSUERS],
  },
  profileCustodianConfiguration: {
    path: "/data-custodian/profile/configuration",
    permissions: [UserGroup.ISSUERS],
  },
  profileCustodianUsers: {
    path: "/data-custodian/profile/users",
    permissions: [UserGroup.ISSUERS],
  },
  profileCustodianKeycards: {
    path: "/data-custodian/profile/keycards",
    permissions: [UserGroup.ISSUERS],
  },
  profileResearcherExperience: {
    path: "/user/profile/experience",
    permissions: [UserGroup.USERS],
  },
  profileResearcherDetails: {
    path: "/user/profile/details",
    permissions: [UserGroup.USERS],
  },
  profileResearcherCompletion: {
    path: "/user/profile/completion",
    permissions: [UserGroup.USERS],
  },
  profileResearcherIdentity: {
    path: "/user/profile/identity",
    permissions: [UserGroup.USERS],
  },
  profileResearcherTraining: {
    path: "/user/profile/training",
    permissions: [UserGroup.USERS],
  },
  profileResearcherAffiliations: {
    path: "/user/profile/affiliations",
    permissions: [UserGroup.USERS],
  },
  profileResearcher: {
    path: "/user/profile",
    permissions: [UserGroup.USERS],
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
