import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function UserAdminPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.USER_ADMINISTRATION,
      }}
    />
  );
}

export default UserAdminPage;