import { useTranslations } from "next-intl";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

const NAMESPACE_TRANSLATION = "ProfileOrganisation";

function ProjectsPage() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION);
  return (
    <Page
      params={{
        tabId: PageTabs.PROJECTS,
      }}
      pageTitle={tProfile("projectsTitle")}
    />
  );
}

export default ProjectsPage;
