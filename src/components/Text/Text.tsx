import { Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

export interface TextProps extends TypographyProps {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconSize?: string;
}

export default function Text({
  children,
  startIcon,
  endIcon,
  sx,
  variant,
  iconSize = "1.25em",
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
        ["> svg, img"]: {
          fontSize: iconSize,
          height: iconSize,
          width: iconSize,
        },
        ...sx,
      }}>
      {startIcon}
      {children}
      {endIcon}
    </Typography>
  );
}
