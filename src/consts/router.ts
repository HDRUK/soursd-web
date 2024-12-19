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
    permissions: [UserGroup.CUSTODIANS],
  },
  usersCustodian: {
    path: "/data-custodian/users",
    permissions: [UserGroup.CUSTODIANS],
  },
  permissionsResearcherCustodian: {
    path: "/data-custodian/permissions/user",
    permissions: [UserGroup.CUSTODIANS],
  },
  permissionsOrganisationCustodian: {
    path: "/data-custodian/permissions/organisation",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianDetails: {
    path: "/data-custodian/profile/details",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjects: {
    path: "/data-custodian/profile/projects",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianOrganisations: {
    path: "/data-custodian/profile/organisations",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfiguration: {
    path: "/data-custodian/profile/configuration",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsers: {
    path: "/data-custodian/profile/users",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianKeycards: {
    path: "/data-custodian/profile/keycards",
    permissions: [UserGroup.CUSTODIANS],
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
  profileOrganisationManageDelegates: {
    path: "/organisation/profile/manage-delegates",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetails: {
    path: "/organisation/profile/details",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsSubsidiaries: {
    path: "/organisation/profile/details/subsidiaries",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationManageUsers: {
    path: "/organisation/profile/manage-users",
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
