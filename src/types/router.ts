import { UserGroup } from "@/consts/user";
import { RoleConfig } from "./roles";

interface RouteParams<T> {
  params: T;
}

interface RoutePermissions extends RoleConfig {
  path: string;
}

interface RouteConfig {
  path: string;
  permissions?: UserGroup[];
}

interface Routes {
  login: RouteConfig;
  logout: RouteConfig;
  register: RouteConfig;
  permissionsUserDataCustodian: RouteConfig;
  permissionsOrganisationDataCustodian: RouteConfig;
  homepage: RouteConfig;
  usersDataCustodian: RouteConfig;
  profileDataCustodian: RouteConfig;
  profileDataCustodianDetails: RouteConfig;
  profileDataCustodianConfiguration: RouteConfig;
  profileDataCustodianKeycards: RouteConfig;
  profileDataCustodianUsers: RouteConfig;
  profileUser: RouteConfig;
  profileUserDetails: RouteConfig;
  profileUserTraining: RouteConfig;
  profileUserExperience: RouteConfig;
  profileUserIdentity: RouteConfig;
  profileUserAffiliations: RouteConfig;
  profileOrganisation: RouteConfig;
  profileOrganisationUser: RouteConfig;
  profileOrganisationDetails: RouteConfig;
  profileOrganisationContacts: RouteConfig;
  profileOrganisationUsers: RouteConfig;
  admin: RouteConfig;
}

export type { RoutePermissions, RouteConfig, Routes, RouteParams };
