import InformationSection from "@/components/InformationSection";
import { mockedIssuerIdvtInfoContent } from "@/mocks/data/cms";
import { Switch, BoxProps, SwitchProps, FormControlLabel } from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "IssuerProfile";

export interface IdvtSectionProps extends Omit<BoxProps, "color"> {
  switchProps: SwitchProps;
}

export default function IdvtSection({
  switchProps,
  ...restProps
}: IdvtSectionProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);

  return (
    <InformationSection
      heading={
        <FormControlLabel
          label={t("idvtHeading")}
          control={<Switch {...switchProps} />}
          labelPlacement="start"
          sx={{ marginLeft: 0 }}
        />
      }
      description={t("idvtDescription")}
      {...restProps}>
      {mockedIssuerIdvtInfoContent}
    </InformationSection>
  );
}
