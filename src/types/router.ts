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
  signup: RouteConfig;
  signupIssuer: RouteConfig;
  signupOrganistion: RouteConfig;
  permissionsResearcherIssuer: RouteConfig;
  permissionsOrganisationIssuer: RouteConfig;
  homepage: RouteConfig;
  usersIssuer: RouteConfig;
  profileIssuer: RouteConfig;
  profileIssuerDetails: RouteConfig;
  profileIssuerConfiguration: RouteConfig;
  profileIssuerKeycards: RouteConfig;
  profileIssuerUsers: RouteConfig;
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
