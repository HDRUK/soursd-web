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
  permissionsResearcherCustodian: RouteConfig;
  permissionsOrganisationCustodian: RouteConfig;
  homepage: RouteConfig;
  usersCustodian: RouteConfig;
  profileCustodian: RouteConfig;
  profileCustodianDetails: RouteConfig;
  profileCustodianProjects: RouteConfig;
  profileCustodianOrganisations: RouteConfig;
  profileCustodianConfiguration: RouteConfig;
  profileCustodianKeycards: RouteConfig;
  profileCustodianUsers: RouteConfig;
  profileResearcher: RouteConfig;
  profileResearcherCompletion: RouteConfig;
  profileResearcherTraining: RouteConfig;
  profileResearcherExperience: RouteConfig;
  profileResearcherIdentity: RouteConfig;
  profileResearcherAffiliations: RouteConfig;
  profileResearcherDetails: RouteConfig;
  profileOrganisation: RouteConfig;
  profileOrganisationUser: RouteConfig;
  profileOrganisationDetails: RouteConfig;
  profileOrganisationContacts: RouteConfig;
  profileOrganisationUsers: RouteConfig;
  admin: RouteConfig;
}

export type { RoutePermissions, RouteConfig, Routes, RouteParams };
