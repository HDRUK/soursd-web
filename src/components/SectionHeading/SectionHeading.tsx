import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { ReactNode } from "react";

export interface SectionHeadingProps extends BoxProps {
  heading?: ReactNode;
  description?: ReactNode;
  type?: "form" | "content";
  size?: "large" | "default";
  variant?: TypographyProps["variant"];
}

export default function SectionHeading({
  heading,
  description,
  variant,
  sx,
  type = "content",
  size = "default",
  ...restProps
}: SectionHeadingProps) {
  const titleProps: Partial<TypographyProps> = {
    variant: variant ?? "h2",
    ...(type === "form" && { component: "fieldset" }),
    sx: {
      width: "100%",
      py: 1,
      border: "none",
      ...(size === "large" && {
        borderRadius: "10px",
        py: 2,
        px: 2,
        backgroundColor: "default.main",
        color: "default.contrastText",
      }),
      ...(type === "form" && {
        fontWeight: "normal",
      }),
      ...sx,
    },
  };

  return (
    <Box {...restProps}>
      {heading && <Typography {...titleProps}>{heading}</Typography>}
      {description && <Typography sx={{ py: 2 }}> {description}</Typography>}
    </Box>
  );
}
