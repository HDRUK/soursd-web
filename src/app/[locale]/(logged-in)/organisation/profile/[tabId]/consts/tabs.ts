enum PageTabs {
  MANAGE_DELEGATES = "manage-delegates",
  DETAILS = "details",
  MANAGE_USERS = "manage-users",
  PROJECTS = "projects",
}

enum PageSubTabs {
  NAME_AND_ADDRESS = "name-and-address",
  DIGITAL_IDENTIFIERS = "digital-identifiers",
  SECTOR_SITE_AND_WEBSITE = "sector-site-and-website",
  SUBSIDIARIES = "subsidiaries",
  SECURITY_COMPLIANCE = "security-compliance",
}

type TabStructure = {
  [key in PageTabs]?: PageSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.DETAILS]: [PageSubTabs.SUBSIDIARIES],
};

function getSubTabs(tab: PageTabs): PageSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export { PageTabs, PageSubTabs, getSubTabs };
