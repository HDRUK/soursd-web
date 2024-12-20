import { ConfigProps, withConfig } from "@/components/Config";
import { PageContainer } from "@/modules";
import { redirect } from "next/navigation";
import { PageTabs, PageSubTabs, getSubTabs } from "../consts/tabs";
import Subsidiaries from "./Subsidiaries/Subsidiaries";

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
