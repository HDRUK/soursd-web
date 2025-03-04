import { mockedVerifications } from "@/mocks/data/static";
import {
  PageBody,
  PageBodyContainer,
  PageColumnBody,
  PageColumnDetails,
  PageColumns,
} from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { PageTabs, ProjectsSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";
import { ResearcherProject } from "@/types/application";

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
