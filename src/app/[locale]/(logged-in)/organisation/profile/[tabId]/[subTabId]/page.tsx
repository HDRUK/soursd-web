import { ConfigProps, withConfig } from "@/components/Config";
import { PageContent, PageGuidance } from "@/modules";
import { useTranslations } from "next-intl";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageSubTabs } from "../consts/tabs";
import SubTabsSections from "./components/SubTabSections";
import SubTabsContents from "./components/SubsTabContents";

interface PageProps extends ConfigProps {
  params: {
    subTabId: PageSubTabs;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "ProfileOrganisation";

function Page({ params: { subTabId } }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageContent sx={{ mx: 4 }}>
      <PageGuidance
        title={t("details")}
        {...mockedPersonalDetailsGuidanceProps}>
        <SubTabsSections />
        <SubTabsContents subTabId={subTabId} />
      </PageGuidance>
    </PageContent>
  );
}

export default withConfig(Page);
