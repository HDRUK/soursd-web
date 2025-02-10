import InformationSection from "@/components/InformationSection";
import { mockedCustodianIdvtInfoContent } from "@/mocks/data/cms";
import {
  BoxProps,
  CheckboxProps,
  Checkbox,
  Typography,
  Box,
  FormControl,
} from "@mui/material";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATIONS_PROFILE = "CustodianProfile";

export interface IdvtSectionProps extends Omit<BoxProps, "color"> {
  checkBoxProps: CheckboxProps;
}

export default function IdvtSection({
  checkBoxProps,
  ...restProps
}: IdvtSectionProps) {
  const t = useTranslations(NAMESPACE_TRANSLATIONS_PROFILE);
  return (
    <FormControl>
      <InformationSection
        heading={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>{t("idvtHeading")}</Typography>
            <Checkbox {...checkBoxProps} />
          </Box>
        }
        description={t("idvtDescription")}
        {...restProps}>
        {mockedCustodianIdvtInfoContent}
      </InformationSection>
    </FormControl>
  );
}
