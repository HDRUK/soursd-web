import { ConfigProps, withConfig } from "@/components/Config";
import { redirect } from "@/i18n/routing";
import { PageBodyContainer } from "@/modules";
import { useTranslations } from "next-intl";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";
import { PageTabs } from "./consts/tabs";

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
  };
}

function Page({ params: { tabId }, config }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileCustodianHome.path);
  }

  return (
    <PageBodyContainer heading={t(tabId)}>
      <TabsSections />
      <TabsContents tabId={tabId} />
    </PageBodyContainer>
  );
}

export default withConfig(Page);
