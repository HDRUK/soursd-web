import { Box, BoxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface FormSectionProps extends BoxProps {
  heading?: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
}

export default function FormSection({
  children,
  heading,
  subtitle,
  description,
  ...restProps
}: FormSectionProps) {
  return (
    <Box
      component="fieldset"
      {...restProps}
      sx={{ p: 0, border: "none", ...restProps.sx }}>
      <Box sx={{ mb: 2 }}>
        {heading && (
          <Box
            component="legend"
            sx={{
              width: "100%",
              px: 2,
              py: 1,
              backgroundColor: "default.main",
              color: "default.contrastText",
            }}>
            {heading}
          </Box>
        )}
        {subtitle && <Typography variant="h6">{subtitle}</Typography>}
        {description}
      </Box>
      <Box sx={{ px: 2 }}>{children}</Box>
    </Box>
  );
}
