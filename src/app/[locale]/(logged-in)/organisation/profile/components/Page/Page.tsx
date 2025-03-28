import { PageBodyContainer } from "@/modules";
import { PageTabs } from "../../consts/tabs";
import TabsContents from "../TabsContents";

interface PageProps {
  params: {
    tabId: PageTabs;
  };
}

function Page({ params: { tabId } }: PageProps) {
  console.log('Page');
  return (
    <PageBodyContainer>
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default Page;
