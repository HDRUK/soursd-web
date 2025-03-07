import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function TrainingPage() {
  return (
    <Page
      params={{
        tabId: PageTabs.TRAINING,
      }}
    />
  );
}

export default TrainingPage;
