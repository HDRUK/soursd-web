import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function AffiliationsPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.AFFILIATIONS,
      }}
    />
  );
}

export default AffiliationsPage;
