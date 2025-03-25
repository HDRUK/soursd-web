import { PageBody, PageGuidance, PageBodyContainer } from "@/modules";
import { mockedConfigurationGuidanceProps } from "@/mocks/data/cms";
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

const NAMESPACE_TRANSLATION_PROFILE = "CustodianProfile";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageBodyContainer heading={t(toCamelCase(params.tabId))}>
      <PageGuidance {...mockedConfigurationGuidanceProps}>
        <PageBody>
          <SubTabsSections {...params} />
          <SubTabsContents {...params} />
        </PageBody>
      </PageGuidance>
    </PageBodyContainer>
  );
}

export default SubPage;
