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
  profileCustodianHome: {
    path: "/data-custodian/profile/home",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianContacts: {
    path: "/data-custodian/profile/contacts",
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
  profileCustodianConfigurationWebhooks: {
    path: "/data-custodian/profile/configuration/webhooks",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfigurationRules: {
    path: "/data-custodian/profile/configuration/rules",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianConfigurationValidationChecks: {
    path: "/data-custodian/profile/configuration/validation-checks",
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
  profileCustodianUserById: {
    path: "/data-custodian/profile/users/{id}",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeProject: {
    path: "/data-custodian/profile/projects/{id}/safe-project",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeData: {
    path: "/data-custodian/profile/projects/{id}/safe-data",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafePeople: {
    path: "/data-custodian/profile/projects/{id}/safe-people",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeSettings: {
    path: "/data-custodian/profile/projects/{id}/safe-settings",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianProjectsSafeOutputs: {
    path: "/data-custodian/profile/projects/{id}/safe-outputs",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersHistory: {
    path: "/data-custodian/profile/users/{id}/history",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersTrainingAccreditations: {
    path: "/data-custodian/profile/users/{id}/training_accreditations",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersIdentity: {
    path: "/data-custodian/profile/users/{id}/identity",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersProjects: {
    path: "/data-custodian/profile/users/{id}/projects",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersCustodianOrgInfo: {
    path: "/data-custodian/profile/users/{id}/custodian_org_info",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianUsersAffiliations: {
    path: "/data-custodian/profile/users/{id}/affiliations",
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
  profileResearcherExperience: {
    path: "/user/profile/experience",
    permissions: [UserGroup.USERS],
  },
  profileResearcherHome: {
    path: "/user/profile/home",
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
  profileResearcherProjects: {
    path: "/user/profile/projects",
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
  profileOrganisationActions: {
    path: "/organisation/profile/actions",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetails: {
    path: "/organisation/profile/details",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationHome: {
    path: "/organisation/profile/home",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsNameAndAddress: {
    path: "/organisation/profile/details/name-and-address",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsDigitalIdentifiers: {
    path: "/organisation/profile/details/digital-identifiers",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsSectorSizeAndWebsite: {
    path: "/organisation/profile/details/sector-size-and-website",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationDetailsSecurityCompliance: {
    path: "/organisation/profile/details/security-compliance",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUserAdministration: {
    path: "/organisation/profile/user-administration",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUserAdministrationDelegates: {
    path: "/organisation/profile/user-administration/delegates",
    permissions: [UserGroup.ORGANISATIONS],
  },
  profileOrganisationUserAdministrationEmployeeStudent: {
    path: "/organisation/profile/user-administration/employees-and-students",
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
