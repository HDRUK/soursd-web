import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function ProjectsPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.PROJECTS,
      }}
    />
  );
}

export default ProjectsPage;
