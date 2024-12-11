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
  profileIssuerProjects: {
    path: "/data-custodian/profile/projects",
    permissions: [UserGroup.ISSUERS],
  },
  profileIssuerOrganisations: {
    path: "/data-custodian/profile/organisations",
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
  profileOrganisationPeople: {
    path: "/organisation/profile/people",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetails: {
    path: "/organisation/profile/details",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationTasks: {
    path: "/organisation/profile/tasks",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationProjects: {
    path: "/organisation/profile/projects",
    permissions: [UserGroup.ORGANISATIONS],
  },
  admin: {
    path: "/admin",
    permissions: [UserGroup.ADMINS],
  },
};

export { PROTECTED_ROUTES, ROUTES };
