import { ConfigProps, withConfig } from "@/components/Config";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageBodyContainer, PageGuidance } from "@/modules";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { ConfigurationSubTabs, PageTabs } from "../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
    subTabId: ConfigurationSubTabs;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function Page({ params: { tabId, subTabId } }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t(toCamelCase(tabId))}>
      <PageGuidance {...mockedPersonalDetailsGuidanceProps}>
        <SubTabsSections />
        <SubTabsContents tabId={tabId} subTabId={subTabId} />
      </PageGuidance>
    </PageBodyContainer>
  );
}

export default withConfig(Page);
