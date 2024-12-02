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
  profileDataCustodian: {
    path: "/data-custodian/profile",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  usersDataCustodian: {
    path: "/data-custodian/users",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  permissionsUserDataCustodian: {
    path: "/data-custodian/permissions/user",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  permissionsOrganisationDataCustodian: {
    path: "/data-custodian/permissions/organisation",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  profileDataCustodianDetails: {
    path: "/data-custodian/profile/details",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  profileDataCustodianConfiguration: {
    path: "/data-custodian/profile/configuration",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  profileDataCustodianUsers: {
    path: "/data-custodian/profile/users",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  profileDataCustodianKeycards: {
    path: "/data-custodian/profile/keycards",
    permissions: [UserGroup.DATA_CUSTODIAN],
  },
  profileUserExperience: {
    path: "/user/profile/experience",
    permissions: [UserGroup.USERS],
  },
  profileUserDetails: {
    path: "/user/profile/details",
    permissions: [UserGroup.USERS],
  },
  profileUserIdentity: {
    path: "/user/profile/identity",
    permissions: [UserGroup.USERS],
  },
  profileUserTraining: {
    path: "/user/profile/training",
    permissions: [UserGroup.USERS],
  },
  profileUserAffiliations: {
    path: "/user/profile/affiliations",
    permissions: [UserGroup.USERS],
  },
  profileUser: {
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
