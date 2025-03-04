import { PageBody, PageBodyContainer } from "@/modules";
import { ResearcherProject } from "@/types/application";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id?: number;
  };
}

export default function SubPageProjects({ params, projectData }: PageProps) {
  const tabId = PageTabs.PROJECTS;

  return (
    <PageBodyContainer heading={projectData.title}>
      <PageBody>
        <SubTabsSections tabId={tabId} {...params} />
        <SubTabsContents tabId={tabId} {...params} />
      </PageBody>
    </PageBodyContainer>
  );
}
