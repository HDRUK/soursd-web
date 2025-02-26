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
  SUBSIDIARIES = "subsidiaries",
  SECURITY_COMPLIANCE = "security-compliance",
}

enum UserAdminPageSubTabs {
  DELEGATE_ADMINISTRATION = "delegates",
  EMPLOYEE_STUDENT_ADMINISTRATION = "employees-and-students",
}

export type PageSubTabs = DetailsPageSubTabs | UserAdminPageSubTabs;

type TabStructure = {
  [key in PageTabs]?: PageSubTabs[];
};

const tabHierarchy: TabStructure = {
  [PageTabs.DETAILS]: Object.values(DetailsPageSubTabs),
  [PageTabs.USER_ADMINISTRATION]: Object.values(UserAdminPageSubTabs),
};

function getSubTabs(tab: PageTabs): PageSubTabs[] | undefined {
  return tabHierarchy[tab];
}

export { PageTabs, DetailsPageSubTabs, UserAdminPageSubTabs, getSubTabs };
