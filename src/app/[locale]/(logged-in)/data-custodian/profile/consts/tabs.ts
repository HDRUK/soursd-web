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

enum UserSubTabs {
  AFFILIATIONS = "affiliations",
  PROJECTS = "projects",
  IDENTITY = "identity",
  TRAINING_ACCREDITATIONS = "training_accreditations",
  CUSTODIAN_ORG_INFO = "custodian_org_information",
  HISTORY = "history",
}

type TabStructure = {
  [key in PageTabs]?: ConfigurationSubTabs[] | UserSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.CONFIGURATION]: Object.values(ConfigurationSubTabs),
  [PageTabs.USERS]: Object.values(UserSubTabs),
};

function getSubTabs(
  tab: PageTabs
): ConfigurationSubTabs[] | UserSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export { UserSubTabs, PageTabs, ConfigurationSubTabs, getSubTabs };
