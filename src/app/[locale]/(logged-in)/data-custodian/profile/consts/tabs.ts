enum PageTabs {
  HOME = "home",
  CONTACTS = "contacts",
  USERS = "users",
  CONFIGURATION = "configuration",
  ORGANISATIONS = "organisations",
  PROJECTS = "projects",
}

enum ConfigurationSubTabs {
  INTEGRATIONS = "integrations",
  WEBHOOKS = "webhooks",
  RULES = "rules",
  VALIDATION_CHECKS = "validation-checks",
}

enum ProjectsSubTabs {
  SAFE_PROJECT = "safe-project",
  SAFE_DATA = "safe-data",
  SAFE_PEOPLE = "safe-people",
  SAFE_SETTINGS = "safe-settings",
  SAFE_OUTPUTS = "safe-outputs",
}

enum OrganisationsSubTabs {
  PEOPLE = "people",
  NAME_ADDRESS = "name_address",
  DIGITAL_IDENTIFIERS = "digital_identifiers",
  SECTOR_WEBSITE = "sector_website",
  DATA_SECURITY_COMPLIANCE = "data_security_compliance",
}

type TabStructure = {
  [key in PageTabs]?:
    | ConfigurationSubTabs[]
    | ProjectsSubTabs[]
    | OrganisationsSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.CONFIGURATION]: Object.values(ConfigurationSubTabs),
  [PageTabs.PROJECTS]: Object.values(ProjectsSubTabs),
  [PageTabs.ORGANISATIONS]: Object.values(OrganisationsSubTabs),
};

function getSubTabs(
  tab: PageTabs
):
  | ConfigurationSubTabs[]
  | ProjectsSubTabs[]
  | OrganisationsSubTabs[]
  | undefined {
  return tabHierarchy[tab];
}

export {
  PageTabs,
  ConfigurationSubTabs,
  ProjectsSubTabs,
  OrganisationsSubTabs,
  getSubTabs,
};
