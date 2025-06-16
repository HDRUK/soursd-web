import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function UsersPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.ORGANISATIONS,
      }}
    />
  );
}

export default UsersPage;
