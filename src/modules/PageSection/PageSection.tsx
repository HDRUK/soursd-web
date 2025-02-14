"use client";

import SectionHeading, {
  SectionHeadingProps,
} from "@/components/SectionHeading";
import { Box, BoxProps } from "@mui/material";

type PageSectionProps = BoxProps & SectionHeadingProps;

export default function PageSection({
  children,
  heading,
  description,
  sx,
  ...restProps
}: PageSectionProps) {
  return (
    <Box
      {...restProps}
      sx={{ position: "relative", zIndex: 1, px: 4, py: 2, ...sx }}>
      <SectionHeading
        type="content"
        heading={heading}
        description={description}
        variant="h5"
        sx={{ mb: 4 }}
      />
      {children}
    </Box>
  );
}
