import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export interface FormSectionProps extends BoxProps {
  heading: ReactNode;
}

export default function FormSection({
  children,
  heading,
  ...restProps
}: FormSectionProps) {
  return (
    <Box
      component="fieldset"
      {...restProps}
      sx={{ p: 0, border: "none", ...restProps.sx }}>
      <Box
        component="legend"
        sx={{
          width: "100%",
          px: 2,
          py: 1,
          backgroundColor: "default.main",
          color: "default.contrastText",
          mb: 3,
        }}>
        {heading}
      </Box>
      <Box sx={{ px: 3 }}>{children}</Box>
    </Box>
  );
}
