import { useTranslations } from "next-intl";
import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

function ProjectsPage() {
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  return (
    <Page
      params={{
        tabId: PageTabs.PROJECTS,
      }}
    />
  );
}

export default ProjectsPage;
