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
  type = "content",
  size = "default",
  ...restProps
}: SectionHeadingProps) {
  let titleProps: Partial<TypographyProps> = {};

  if (type === "form") {
    titleProps = {
      component: "fieldset",
    };
  } else {
    titleProps = {
      variant,
    };
  }

  return (
    <Box {...restProps}>
      {heading && (
        <Typography
          variant="h2"
          {...titleProps}
          sx={{
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
          }}>
          {heading}
        </Typography>
      )}
      {description && <Typography>{description}</Typography>}
    </Box>
  );
}
