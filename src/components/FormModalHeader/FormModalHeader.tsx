import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface FormHeaderProps extends BoxProps {
  children: ReactNode;
}

export default function FormModalHeader({
  children,
  ...restProps
}: FormHeaderProps) {
  return (
    <Box {...restProps} sx={{ mb: 2, ...restProps.sx }}>
      {children}
    </Box>
  );
}
