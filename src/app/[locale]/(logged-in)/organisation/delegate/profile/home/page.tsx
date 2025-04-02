import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function DelegateHomePage() {
  return (
    <Page
      params={{
        tabId: PageTabs.HOME,
      }}
    />
  );
}

export default DelegateHomePage;
