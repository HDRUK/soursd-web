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
  homepage: RouteConfig;
  usersCustodian: RouteConfig;
  profileCustodian: RouteConfig;
  profileCustodianHome: RouteConfig;
  profileCustodianContacts: RouteConfig;
  profileCustodianProjects: RouteConfig;
  profileCustodianOrganisations: RouteConfig;
  profileCustodianConfiguration: RouteConfig;
  profileCustodianKeycards: RouteConfig;
  profileCustodianUsers: RouteConfig;
  permissionsResearcherCustodian: RouteConfig;
  permissionsOrganisationCustodian: RouteConfig;
  profileResearcher: RouteConfig;
  profileResearcherCompletion: RouteConfig;
  profileResearcherTraining: RouteConfig;
  profileResearcherExperience: RouteConfig;
  profileResearcherIdentity: RouteConfig;
  profileResearcherAffiliations: RouteConfig;
  profileResearcherHome: RouteConfig;
  profileResearcherProjects: RouteConfig;
  profileOrganisation: RouteConfig;
  profileOrganisationActions: RouteConfig;
  profileOrganisationDetails: RouteConfig;
  profileOrganisationDetailsNameAndAddress: RouteConfig;
  profileOrganisationDetailsDigitalIdentifiers: RouteConfig;
  profileOrganisationDetailsSectorSizeAndWebsite: RouteConfig;
  profileOrganisationDetailsSubsidiaries: RouteConfig;
  profileOrganisationDetailsSecurityCompliance: RouteConfig;
  profileOrganisationUserAdministration: RouteConfig;
  profileOrganisationUserAdministrationDelegates: RouteConfig;
  profileOrganisationUserAdministrationEmployeeStudent: RouteConfig;
  profileOrganisationProjects: RouteConfig;
  admin: RouteConfig;
}

export type { RoutePermissions, RouteConfig, Routes, RouteParams };
