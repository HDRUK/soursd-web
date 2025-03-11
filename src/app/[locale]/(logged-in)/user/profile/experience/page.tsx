import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function ExperiencePage() {
  return (
    <Page
      params={{
        tabId: PageTabs.EXPERIENCE,
      }}
    />
  );
}

export default ExperiencePage;
