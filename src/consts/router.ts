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
  profileCustodianUsers: {
    path: "/data-custodian/profile/users",
    permissions: [UserGroup.CUSTODIANS],
  },
  profileCustodianKeycards: {
    path: "/data-custodian/profile/keycards",
    permissions: [UserGroup.CUSTODIANS],
  },
  permissionsOrganisationCustodian: {
    path: "/data-custodian/permissions",
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
  profileOrganisationDetailsSubsidiaries: {
    path: "/organisation/profile/details/subsidiaries",
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
