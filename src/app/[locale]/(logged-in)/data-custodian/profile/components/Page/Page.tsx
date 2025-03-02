import { PageTabs } from "../../consts/tabs";
import TabsContents from "../TabsContents";

interface PageProps {
  params: {
    tabId: PageTabs;
  };
}

function Page({ params: { tabId } }: PageProps) {
  return <TabsContents tabId={tabId} />;
}

export default Page;
