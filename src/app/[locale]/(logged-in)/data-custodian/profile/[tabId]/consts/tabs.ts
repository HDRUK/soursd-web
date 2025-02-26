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

type TabStructure = {
  [key in PageTabs]?: ConfigurationSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.CONFIGURATION]: Object.values(ConfigurationSubTabs),
};

function getSubTabs(tab: PageTabs): ConfigurationSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export { PageTabs, ConfigurationSubTabs, getSubTabs };
