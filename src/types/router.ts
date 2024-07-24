import { RoleConfig } from "./roles";

interface RouteParams<T> {
  params: T;
}

interface RoutePermissions extends RoleConfig {
  path: string;
}

interface RouteConfig {
  path: string;
  key: string;
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
  profileIssuer: RouteConfig;
  profileResearcher: RouteConfig;
  profileResearcherDetails: RouteConfig;
  profileResearcherTraining: RouteConfig;
  profileResearcherExperience: RouteConfig;
  profileResearcherIdentity: RouteConfig;
  profileResearcherAffiliations: RouteConfig;
  profileOrganisation: RouteConfig;
}

export type { RoutePermissions, RouteConfig, Routes, RouteParams };
