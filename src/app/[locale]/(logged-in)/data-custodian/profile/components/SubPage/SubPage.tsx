import { PageBody, PageGuidance, PageBodyContainer } from "@/modules";
import { mockedConfigurationRulesGuidanceProps } from "@/mocks/data/cms";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { ConfigurationSubTabs, PageTabs, UserSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: ConfigurationSubTabs | UserSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION = "CustodianProfile";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  return (
    <PageBodyContainer heading={t(toCamelCase(params.tabId))}>
      <PageGuidance {...mockedConfigurationRulesGuidanceProps}>
        <PageBody>
          <SubTabsSections {...params} />
          <SubTabsContents {...params} />
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}

export default SubPage;
