import InformationSection from "@/components/InformationSection";
import { mockedIssuerIdvtInfoContent } from "@/mocks/data/cms";
import { Switch } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "IssuerProfile";

export default function IdvtSection() {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <InformationSection
      heading={
        <>
          {t("idvtHeading")} <Switch />
        </>
      }
      description={t("idvtDescription")}>
      {mockedIssuerIdvtInfoContent}
    </InformationSection>
  );
}
