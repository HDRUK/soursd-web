import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import PageSection from "@/modules/PageSection/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Sections from "./components/Sections/Sections";

const NAMESPACE_TRANSLATIONS_PROFILE = "Profile";

function Page() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <DecoratorPage>
      <PageSection>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection>
        <Sections />
      </PageSection>
    </DecoratorPage>
  );
}

export default withAuth(Page);
