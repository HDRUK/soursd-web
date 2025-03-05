import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function IdentityPage() {
  console.log('at identity page');
  return (
    <Page
      params={{
        tabId: PageTabs.IDENTITY,
      }}
    />
  );
}

export default IdentityPage;
