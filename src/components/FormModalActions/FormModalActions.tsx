import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface FormModalActionsProps extends BoxProps {
  children: ReactNode;
}

export default function FormModalActions({
  children,
  ...restProps
}: FormModalActionsProps) {
  return (
    <Box
      {...restProps}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
        mt: 5,
        ...restProps.sx,
      }}>
      {children}
    </Box>
  );
}
