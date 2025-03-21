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
    <Box {...restProps} sx={{ position: "relative", zIndex: 1, pr: 2, ...sx }}>
      {(!!heading || !!description) && (
        <SectionHeading
          type="content"
          heading={heading}
          description={description}
          variant="h3"
          sx={{ mb: 3 }}
        />
      )}
      {children}
    </Box>
  );
}
