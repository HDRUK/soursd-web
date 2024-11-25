import PageContainer from "@/modules/PageContainer";
import PageSection from "@/modules/PageSection";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Sections from "./components/Sections/Sections";

const NAMESPACE_TRANSLATIONS_ADMINISTRATION = "Administration";

function Page() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_ADMINISTRATION);

  return (
    <PageContainer>
      <PageSection>
        <Typography variant="h4">{t("title")}</Typography>
      </PageSection>
      <PageSection>
        <Sections />
      </PageSection>
    </PageContainer>
  );
}

export default Page;
