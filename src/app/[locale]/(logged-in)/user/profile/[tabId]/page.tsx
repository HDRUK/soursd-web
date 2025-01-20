import { ConfigProps, withConfig } from "@/components/Config";
import { PageContainer } from "@/modules";
import { redirect } from "@/i18n/routing";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";
import { PageTabs } from "./consts/tabs";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
  };
}

function Page({ params: { tabId }, config }: PageProps) {
  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileResearcherDetails.path);
  }

  return (
    <PageContainer>
      <TabsSections />
      <TabsContents tabId={tabId} />
    </PageContainer>
  );
}

export default withConfig(Page);
