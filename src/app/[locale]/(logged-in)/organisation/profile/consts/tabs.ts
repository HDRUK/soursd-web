enum PageTabs {
  HOME = "home",
  DETAILS = "details",
  USER_ADMINISTRATION = "user-administration",
  PROJECTS = "projects",
}

enum DetailsPageSubTabs {
  NAME_AND_ADDRESS = "name-and-address",
  DIGITAL_IDENTIFIERS = "digital-identifiers",
  SECTOR_SIZE_AND_WEBSITE = "sector-size-and-website",
  SECURITY_COMPLIANCE = "security-compliance",
}

enum UserAdminPageSubTabs {
  DELEGATE_ADMINISTRATION = "delegates",
  EMPLOYEE_STUDENT_ADMINISTRATION = "employees-and-students",
}

enum ProjectsSubTabs {
  SAFE_PROJECT = "safe-project",
  SAFE_DATA = "safe-data",
  SAFE_PEOPLE = "safe-people",
  SAFE_SETTINGS = "safe-settings",
  SAFE_OUTPUTS = "safe-outputs",
}

enum UserSubTabs {
  AFFILIATIONS = "affiliations",
  PROJECTS = "projects",
  IDENTITY = "identity",
  TRAINING_ACCREDITATIONS = "training_accreditations",
  CUSTODIAN_ORG_INFO = "custodian_org_info",
  HISTORY = "history",
}

export type PageSubTabs =
  | DetailsPageSubTabs
  | UserAdminPageSubTabs
  | ProjectsSubTabs;

type TabStructure = {
  [key in PageTabs]?: PageSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.DETAILS]: Object.values(DetailsPageSubTabs),
  [PageTabs.USER_ADMINISTRATION]: Object.values(UserAdminPageSubTabs),
  [PageTabs.PROJECTS]: Object.values(ProjectsSubTabs),
};

function getSubTabs(tab: PageTabs): PageSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export {
  PageTabs,
  DetailsPageSubTabs,
  ProjectsSubTabs,
  UserAdminPageSubTabs,
  UserSubTabs,
  getSubTabs,
};
