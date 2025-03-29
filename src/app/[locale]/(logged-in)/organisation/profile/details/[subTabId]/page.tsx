import SubPage from "../../components/SubPage";
import { DetailsPageSubTabs, PageTabs } from "../../consts/tabs";

interface DetailsPageProps {
  params: {
    subTabId: DetailsPageSubTabs;
  };
}

function DetailsPage({ params: { subTabId } }: DetailsPageProps) {
  return (
    <SubPage
      params={{
        tabId: PageTabs.DETAILS,
        subTabId,
      }}
    />
  );
}

export default DetailsPage;
