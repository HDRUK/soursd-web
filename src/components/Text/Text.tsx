import { Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

interface TextProps extends TypographyProps {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export default function Text({
  children,
  startIcon,
  endIcon,
  sx,
  variant,
  ...restProps
}: TextProps) {
  return (
    <Typography
      {...restProps}
      variant={variant}
      sx={{
        display: variant === "caption" ? "inline-flex" : "flex",
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
    </Typography>
  );
}
