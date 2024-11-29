import { ConfigProps, withConfig } from "@/components/Config";
import { PageContainer, PageSection, PageTitle } from "@/modules";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import TabsContents from "./components/TabsContents";
import TabsSections from "./components/TabsSections";
import { PageTabs } from "./consts/tabs";

const NAMESPACE_TRANSLATIONS_PROFILE = "ProfileOrganisation";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
  };
}

function Page({ params: { tabId }, config }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  if (!Object.values(PageTabs).includes(tabId)) {
    redirect(config.routes.profileOrganisationDetails.path);
  }

  return (
    <PageContainer>
      <TabsSections />
      <PageTitle>
        <Typography variant="h3">{t(tabId)}</Typography>
      </PageTitle>
      <PageSection sx={{ flexGrow: 1 }}>
        <TabsContents tabId={tabId} />
      </PageSection>
    </PageContainer>
  );
}

export default withConfig(Page);
