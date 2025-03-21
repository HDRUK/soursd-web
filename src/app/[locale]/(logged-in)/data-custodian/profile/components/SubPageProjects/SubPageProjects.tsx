import { useStore } from "@/data/store";
import { PageBody, PageBodyContainer } from "@/modules";
import { ProjectDetails, ResearcherProject } from "@/types/application";
import { useEffect } from "react";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";
import { useTranslations } from "next-intl";
import { toCamelCase } from "@/utils/string";

interface PageProps {
  projectData: ResearcherProject;
  projectDetailsData: ProjectDetails;
  params: {
    subTabId: ProjectsSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function SubPageProjects({
  params,
  projectData,
  projectDetailsData,
}: PageProps) {
  const tabId = PageTabs.PROJECTS;
  const t = useTranslations(NAMESPACE_TRANSLATION);

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
        <SubTabsSections tabId={tabId} {...params} />
        <SubTabsContents
          tabId={tabId}
          {...params}
          heading={t(toCamelCase(params.subTabId))}
        />
      </PageBodyContainer>
    )
  );
}
