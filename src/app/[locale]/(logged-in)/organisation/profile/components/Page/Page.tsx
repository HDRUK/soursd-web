import { PageBodyContainer } from "@/modules";
import { PageTabs } from "../../consts/tabs";
import TabsContents from "../TabsContents";

interface PageProps {
  params: {
    tabId: PageTabs;
  };
  pageTitle?: string;
}

function Page({ params: { tabId }, pageTitle }: PageProps) {
  console.log('Page');
  return (
    <PageBodyContainer heading={pageTitle ?? ""}>
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default Page;
