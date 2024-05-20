import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface InlineStatusProps extends BoxProps {
  children: ReactNode;
}

export default function InlineStatus({
  children,
  sx,
  ...restProps
}: InlineStatusProps) {
  return (
    <Box
      {...restProps}
      sx={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        gap: 1,
        ...sx,
      }}>
      {children}
    </Box>
  );
}
