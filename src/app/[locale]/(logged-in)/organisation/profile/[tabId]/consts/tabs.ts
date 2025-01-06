enum PageTabs {
  MANAGE_DELEGATES = "manage-delegates",
  DETAILS = "details",
  MANAGE_USERS = "manage-users",
  PROJECTS = "projects",
}

enum PageSubTabs {
  SUBSIDIARIES = "subsidiaries",
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
