import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

interface TextProps extends BoxProps {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function Text({
  children,
  startIcon,
  endIcon,
  sx,
  ...restProps
}: TextProps) {
  return (
    <Box
      {...restProps}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        ["> svg"]: {
          fontSize: "1.25em",
        },
        ...sx,
      }}>
      {startIcon}
      {children}
      {endIcon}
    </Box>
  );
}
