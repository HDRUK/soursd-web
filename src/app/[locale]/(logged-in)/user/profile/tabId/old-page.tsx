import { ConfigProps, withConfig } from "@/components/Config";
import { redirect } from "next/navigation";
import { PageBodyContainer } from "@/modules";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";
import { PageTabs } from "./consts/tabs";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
  };
}

async function Page({ params: { tabId }, config }: PageProps) {
  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileResearcherHome.path);
  }

  return (
    <>
      <TabsSections />
      <PageBodyContainer>
        <TabsContents tabId={tabId} />
      </PageBodyContainer>
    </>
  );
}

export default withConfig(Page);
