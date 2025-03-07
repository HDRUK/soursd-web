import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function IdentityPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.IDENTITY,
      }}
    />
  );
}

export default IdentityPage;
