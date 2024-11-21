import { withAuth } from "@/components/Auth";
import DecoratorPage from "@/modules/DecoratorPage";
import PageSection from "@/modules/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import IdvtSection from "./components/IdvtSection";

const NAMESPACE_TRANSLATIONS_PROFILE = "IssuerProfile";

function Page() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <DecoratorPage>
      <PageSection>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection sx={{ flexGrow: 1 }}>
        <IdvtSection />
      </PageSection>
    </DecoratorPage>
  );
}

export default withAuth(Page);
