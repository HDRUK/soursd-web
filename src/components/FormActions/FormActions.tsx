import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
  sx?: SxProps;
}

export default function FormActions({
  children,
  sx,
  ...restProps
}: FormActionsProps) {
  return (
    <Box sx={{ mt: 2, ...sx }} {...restProps}>
      {children}
    </Box>
  );
}
