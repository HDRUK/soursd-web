import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function ExperiencePage() {
  console.log('at experience page');
  return (
    <Page
      params={{
        tabId: PageTabs.EXPERIENCE,
      }}
    />
  );
}

export default ExperiencePage;
