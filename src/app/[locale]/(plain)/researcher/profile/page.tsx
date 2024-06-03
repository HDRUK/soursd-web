import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import PageSection from "@/modules/PageSection/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import PersonalDetails from "./components/PersonalDetails";

const NAMESPACE_TRANSLATIONS_PROFILE = "Profile";

function Page() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <DecoratorPage>
      <PageSection>
        <Typography variant="h4" sx={{ mt: 2 }}>
          {t("title")}
        </Typography>
      </PageSection>
      <PageSection>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {t("personalDetails")}
        </Typography>
        <PersonalDetails />
      </PageSection>
    </DecoratorPage>
  );
}

export default withAuth(Page);
