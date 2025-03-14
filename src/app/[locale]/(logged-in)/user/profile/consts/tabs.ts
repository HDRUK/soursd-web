enum PageTabs {
  EXPERIENCE = "experience",
  AFFILIATIONS = "affiliations",
  IDENTITY = "identity",
  TRAINING = "training",
  HOME = "home",
  PROJECTS = "projects",
}

enum ProjectsSubTabs {
  SAFE_PROJECT = "safe-project",
  SAFE_DATA = "safe-data",
  SAFE_PEOPLE = "safe-people",
  SAFE_SETTINGS = "safe-settings",
  SAFE_OUTPUTS = "safe-outputs",
}

type TabStructure = {
  [key in PageTabs]?: ProjectsSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.PROJECTS]: Object.values(ProjectsSubTabs),
};

function getSubTabs(tab: PageTabs): ProjectsSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export { PageTabs, ProjectsSubTabs, getSubTabs };
