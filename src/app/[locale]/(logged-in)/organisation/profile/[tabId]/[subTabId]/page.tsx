import { ConfigProps, withConfig } from "@/components/Config";
import { redirect } from "@/i18n/routing";
import { PageContainer, PageContent } from "@/modules";
import { PageTabs, PageSubTabs } from "../consts/tabs";
import SubTabsSections from "./components/SubTabSections";
import SubTabsContents from "./components/SubsTabContents";
import { PageGuidance } from "@/modules";
import { useTranslations } from "next-intl";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";

interface PageProps extends ConfigProps {
  params: {
    subTabId: PageSubTabs;
  };
}

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

function Page({ params: { subTabId }, config }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  return (
    <PageContent sx={{ mx: 4 }}>
      <PageGuidance
        title={t("identity")}
        {...mockedPersonalDetailsGuidanceProps}>
        <SubTabsSections />
        <SubTabsContents subTabId={subTabId} />
      </PageGuidance>
    </PageContent>
  );
}

export default withConfig(Page);
