enum PageTabs {
  HOME = "home",
  CONTACTS = "contacts",
  USERS = "users",
  CONFIGURATION = "configuration",
  ORGANISATIONS = "organisations",
  PROJECTS = "projects",
}

enum ConfigurationSubTabs {
  WEBHOOKS = "webhooks",
  RULES = "rules",
  VALIDATION_CHECKS = "validation-checks",
}

enum ProjectsSubTabs {
  SAFE_PROJECT = "safe_project",
  SAFE_DATA = "safe_data",
  SAFE_PEOPLE = "safe_people",
  SAFE_SETTINGS = "safe_settings",
  SAFE_OUTPUTS = "safe_outputs",
}

enum UserSubTabs {
  AFFILIATIONS = "affiliations",
  PROJECTS = "projects",
  IDENTITY = "identity",
  TRAINING_ACCREDITATIONS = "training_accreditations",
  CUSTODIAN_ORG_INFO = "custodian_org_info",
  HISTORY = "history",
}

type TabStructure = {
  [key in PageTabs]?:
    | ConfigurationSubTabs[]
    | UserSubTabs[]
    | ProjectsSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.CONFIGURATION]: Object.values(ConfigurationSubTabs),
  [PageTabs.USERS]: Object.values(UserSubTabs),
  [PageTabs.PROJECTS]: Object.values(ProjectsSubTabs),
};

function getSubTabs(
  tab: PageTabs
): ConfigurationSubTabs[] | UserSubTabs[] | ProjectsSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export {
  UserSubTabs,
  PageTabs,
  ConfigurationSubTabs,
  ProjectsSubTabs,
  getSubTabs,
};
