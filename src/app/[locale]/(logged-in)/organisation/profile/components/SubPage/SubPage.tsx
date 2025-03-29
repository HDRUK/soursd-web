import { PageBody, PageGuidance, PageBodyContainer } from "@/modules";
import { mockedConfigurationRulesGuidanceProps } from "@/mocks/data/cms";
import { toCamelCase } from "@/utils/string";
import { useTranslations } from "next-intl";
import { DetailsPageSubTabs, PageTabs, UserAdminPageSubTabs } from "../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface PageProps {
  params: {
    tabId: PageTabs;
    subTabId: DetailsPageSubTabs | UserAdminPageSubTabs;
    id?: number;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

function SubPage({ params }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  console.log('SubPage params.tabId', params.tabId);

  return (
    <PageBodyContainer heading={t(toCamelCase(`${params.tabId}Title`))}>
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
