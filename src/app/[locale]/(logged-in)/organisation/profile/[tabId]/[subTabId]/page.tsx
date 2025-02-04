import { ConfigProps, withConfig } from "@/components/Config";
import { PageContent, PageGuidance } from "@/modules";
import { useTranslations } from "next-intl";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { toCamelCase } from "@/utils/string";
import { PageTabs, PageSubTabs } from "../consts/tabs";
import SubTabsSections from "./components/SubTabSections";
import SubTabsContents from "./components/SubsTabContents";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
    subTabId: PageSubTabs;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

function Page({ params: { tabId, subTabId } }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageContent sx={{ mx: 4 }}>
      <PageGuidance
        title={t(toCamelCase(tabId))}
        subTabs={<SubTabsSections />}
        {...mockedPersonalDetailsGuidanceProps}>
        <SubTabsContents subTabId={subTabId} />
      </PageGuidance>
    </PageContent>
  );
}

export default withConfig(Page);
