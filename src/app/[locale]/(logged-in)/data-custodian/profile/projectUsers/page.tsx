import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function ProjectUsersPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.USERS,
      }}
    />
  );
}

export default ProjectUsersPage;
