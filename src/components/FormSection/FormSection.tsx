import { Box, BoxProps } from "@mui/material";
import SectionHeading, { SectionHeadingProps } from "../SectionHeading";

export type FormSectionProps = BoxProps & SectionHeadingProps;

export default function FormSection({
  children,
  heading,
  description,
  ...restProps
}: FormSectionProps) {
  return (
    <Box
      component="fieldset"
      {...restProps}
      sx={{ p: 0, border: "none", ...restProps.sx }}>
      {heading && (
        <Box sx={{ mb: 2 }}>
          <SectionHeading
            type="form"
            heading={heading}
            description={description}
            variant="h4"
          />
        </Box>
      )}
      <Box sx={{ px: 2 }}>{children}</Box>
    </Box>
  );
}
