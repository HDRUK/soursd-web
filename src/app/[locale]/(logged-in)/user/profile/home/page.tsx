import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function UsersPage() {
  console.log('at home page');
  return (
    <Page
      params={{
        tabId: PageTabs.HOME,
      }}
    />
  );
}

export default UsersPage;
