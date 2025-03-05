import Page from "../components/Page";
import { PageTabs } from "../consts/tabs";

function TrainingPage() {
  console.log('at training page');
  return (
    <Page
      params={{
        tabId: PageTabs.TRAINING,
      }}
    />
  );
}

export default TrainingPage;
