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
  profileCustodianUserById: RouteConfig;
  profileCustodianHome: RouteConfig;
  profileCustodianContacts: RouteConfig;
  profileCustodianProjects: RouteConfig;
  profileCustodianProjectsSafeProject: RouteConfig;
  profileCustodianProjectsSafeData: RouteConfig;
  profileCustodianProjectsSafePeople: RouteConfig;
  profileCustodianProjectsSafeSettings: RouteConfig;
  profileCustodianProjectsSafeOutputs: RouteConfig;
  profileCustodianOrganisations: RouteConfig;
  profileCustodianConfiguration: RouteConfig;
  profileCustodianConfigurationWebhooks: RouteConfig;
  profileCustodianConfigurationRules: RouteConfig;
  profileCustodianConfigurationValidationChecks: RouteConfig;
  profileCustodianKeycards: RouteConfig;
  profileCustodianUsers: RouteConfig;
  profileCustodianUsersProjects: RouteConfig;
  profileCustodianUsersHistory: RouteConfig;
  profileCustodianUsersTrainingAccreditations: RouteConfig;
  profileCustodianUsersCustodianOrgInfo: RouteConfig;
  profileCustodianUsersIdentity: RouteConfig;
  profileCustodianUsersAffiliations: RouteConfig;
  permissionsOrganisationCustodian: RouteConfig;
  permissionsResearcherCustodian: RouteConfig;
  profileOrganisationHome: RouteConfig;
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
  profileOrganisationDetailsSecurityCompliance: RouteConfig;
  profileOrganisationUserAdministration: RouteConfig;
  profileOrganisationUserAdministrationDelegates: RouteConfig;
  profileOrganisationUserAdministrationEmployeeStudent: RouteConfig;
  profileOrganisationProjects: RouteConfig;
  admin: RouteConfig;
}

export type { RoutePermissions, RouteConfig, Routes, RouteParams };
