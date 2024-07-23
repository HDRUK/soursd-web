import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import PageSection from "@/modules/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "OrganisationProfile";

function Page() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <DecoratorPage>
      <PageSection>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>Content</PageSection>
    </DecoratorPage>
  );
}

export default withAuth(Page);
