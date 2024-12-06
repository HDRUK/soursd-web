import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface FormModalBodyProps extends BoxProps {
  children: ReactNode;
}

export default function FormModalBody({
  children,
  ...restProps
}: FormModalBodyProps) {
  return (
    <Box {...restProps} sx={{ px: 4, mb: 3, ...restProps.sx }}>
      {children}
    </Box>
  );
}
