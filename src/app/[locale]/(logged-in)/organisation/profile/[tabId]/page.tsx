import { withAuth } from "@/components/Auth";
import { ConfigProps } from "@/components/Config";
import DecoratorPage from "@/modules/DecoratorPage";
import PageSection from "@/modules/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Sections from "./components/Sections";
import TabsSections from "./components/TabsSections";
import { PageTabs } from "./consts/tabs";

interface PageProps extends ConfigProps {
  params: {
    tabId: PageTabs;
  };
}

const NAMESPACE_TRANSLATIONS_PROFILE = "ProfileOrganisation";

function Page({ params: { tabId } }: PageProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <DecoratorPage>
      <PageSection>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        <Sections>
          <TabsSections />
          {tabId === PageTabs.USER && "User"}
          {tabId === PageTabs.DETAILS && "Details"}
          {tabId === PageTabs.CONTACTS && "Contacts"}
          {tabId === PageTabs.APPROVALS && "Approval"}
        </Sections>
      </PageSection>
    </DecoratorPage>
  );
}

export default withAuth(Page);
