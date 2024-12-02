import { ConfigProps, withConfig } from "@/components/Config";
import Guidance from "@/components/Guidance";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageContainer, PageSection, PageTitle } from "@/modules";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";
import { PageTabs } from "./consts/tabs";
import { PageContent } from "@/modules";

const NAMESPACE_TRANSLATIONS_PROFILE = "Profile";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
  };
}

function Page({ params: { tabId }, config }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileResearcherDetails.path);
  }

  return (
    <PageContainer>
      <TabsSections />
      <TabsContents tabId={tabId} />
    </PageContainer>
  );
}

export default withConfig(Page);
