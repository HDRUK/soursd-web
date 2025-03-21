import { useStore } from "@/data/store";
import { PageBody, PageBodyContainer } from "@/modules";
import { ProjectDetails, ResearcherProject } from "@/types/application";
import { useEffect } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  projectData: ResearcherProject;
  projectDetailsData: ProjectDetails;
  params: {
    subTabId: ProjectsSubTabs;
    id?: number;
  };
}

export default function SubPageProjects({
  params,
  projectData,
  projectDetailsData,
}: PageProps) {
  const tabId = PageTabs.PROJECTS;

  const { project, setProject, projectDetails, setProjectDetails } = useStore(
    ({ getProject, setProject, getProjectDetails, setProjectDetails }) => ({
      project: getProject(),
      setProject,
      projectDetails: getProjectDetails(),
      setProjectDetails,
    })
  );

  useEffect(() => {
    setProject(projectData);
    setProjectDetails(projectDetailsData);
  }, [projectData, projectDetails]);

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
