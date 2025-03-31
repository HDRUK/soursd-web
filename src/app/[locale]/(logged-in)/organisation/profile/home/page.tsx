import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function UsersPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.HOME,
      }}
    />
  );
}

export default UsersPage;
