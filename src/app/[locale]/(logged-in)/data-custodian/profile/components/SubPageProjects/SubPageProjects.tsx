import { PageBody, PageBodyContainer } from "@/modules";
import { ResearcherProject } from "@/types/application";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";
import { useStore } from "@/data/store";
import { useEffect } from "react";

interface PageProps {
  projectData: ResearcherProject;
  params: {
    subTabId: ProjectsSubTabs;
    id?: number;
  };
}

export default function SubPageProjects({ params, projectData }: PageProps) {
  const tabId = PageTabs.PROJECTS;

  const [project, setProject] = useStore(state => [
    state.getProject(),
    state.setProject,
  ]);

  useEffect(() => {
    setProject(projectData);
  }, []);

  return (
    project && (
      <PageBodyContainer heading={projectData.title}>
        <PageBody>
          <SubTabsSections tabId={tabId} {...params} />
          <SubTabsContents tabId={tabId} {...params} />
        </PageBody>
      </PageBodyContainer>
    )
  );
}
