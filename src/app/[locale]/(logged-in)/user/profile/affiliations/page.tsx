import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function AffiliationsPage() {
  console.log('at affiliations page');
  return (
    <Page
      params={{
        tabId: PageTabs.AFFILIATIONS,
      }}
    />
  );
}

export default AffiliationsPage;
