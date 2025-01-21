import { ConfigProps, withConfig } from "@/components/Config";
import { PageContainer } from "@/modules";
import { redirect } from "@/i18n/routing";
import { PageTabs, PageSubTabs, getSubTabs } from "../consts/tabs";
import Subsidiaries from "./Subsidiaries";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
    subTabId: PageSubTabs;
  };
}

function Page({ params: { tabId, subTabId }, config }: PageProps) {
  if (!(tabId && getSubTabs(tabId)?.includes(subTabId))) {
    redirect(config.routes.profileOrganisationDetails.path);
  }

  return (
    <PageContainer>
      <Subsidiaries />
    </PageContainer>
  );
}

export default withConfig(Page);
