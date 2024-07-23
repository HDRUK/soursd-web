import { withAuth } from "@/components/Auth";
import { ConfigProps, withConfig } from "@/components/Config";
import DecoratorPage from "@/modules/DecoratorPage";
import PageSection from "@/modules/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import Affiliations from "./components/Affiliations";
import Details from "./components/Details";
import Sections from "./components/Sections";
import { PageTabs } from "./consts/tabs";
import TabsSections from "./components/TabsSections";

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
    <DecoratorPage>
      <PageSection>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        <Sections>
          <TabsSections />
          {tabId === PageTabs.DETAILS && <Details />}
          {tabId === PageTabs.EXPERIENCE && "Experience"}
          {tabId === PageTabs.AFFILIATIONS && <Affiliations />}
          {tabId === PageTabs.IDENTITY && "Identity"}
          {tabId === PageTabs.TRAINING && "Training"}
        </Sections>
      </PageSection>
    </DecoratorPage>
  );
}

export default withConfig(withAuth(Page));
