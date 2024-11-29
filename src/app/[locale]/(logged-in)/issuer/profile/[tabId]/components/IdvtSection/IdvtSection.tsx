import InformationSection from "@/components/InformationSection";
import Switch, { SwitchProps } from "@/components/Switch";
import { mockedIssuerIdvtInfoContent } from "@/mocks/data/cms";
import { BoxProps } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "IssuerProfile";

export interface IdvtSectionProps extends Omit<BoxProps, "color"> {
  switchProps: Omit<SwitchProps, "label">;
}

export default function IdvtSection({
  switchProps,
  ...restProps
}: IdvtSectionProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <InformationSection
      heading={<Switch label={t("idvtHeading")} {...switchProps} />}
      description={t("idvtDescription")}
      {...restProps}>
      {mockedIssuerIdvtInfoContent}
    </InformationSection>
  );
}
