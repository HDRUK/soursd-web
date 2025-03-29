import { useStore } from "@/data/store";
import { PageBodyContainer } from "@/modules";
import { ResearcherProject } from "@/types/application";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
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

const NAMESPACE_TRANSLATION = "ProfileOrganisation";

export default function SubPageProjects({ params, projectData }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const tabId = PageTabs.PROJECTS;

  const [project, setProject] = useStore(state => [
    state.getProject(),
    state.setProject,
  ]);

  useEffect(() => {
    setProject(projectData);
  }, [projectData]);

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
