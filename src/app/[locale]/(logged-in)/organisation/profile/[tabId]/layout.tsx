import { ConfigProps, withConfig } from "@/components/Config";
import { PageBodyContainer } from "@/modules";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";
import { PageSubTabs, PageTabs } from "./consts/tabs";

interface LayoutProps extends ConfigProps {
  children: ReactNode;
  params: {
    tabId: PageTabs;
    subTabId: PageSubTabs;
  };
}

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

function Layout({ children, params: { tabId }, config }: LayoutProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileOrganisationHome.path);
  }

  return (
    <>
      <TabsSections />
      <PageBodyContainer heading={t(tabId)}>
        <TabsContents tabId={tabId} />
        {children}
      </PageBodyContainer>
    </>
  );
}

export default withConfig(Layout);
