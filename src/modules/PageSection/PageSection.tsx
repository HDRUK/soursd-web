"use client";

import SectionHeading, {
  SectionHeadingProps,
} from "@/components/SectionHeading";
import { User } from "@/types/application";
import { Box, BoxProps } from "@mui/material";

type PageSectionProps = BoxProps &
  SectionHeadingProps & {
    me: User;
  };

export default function PageSection({
  children,
  heading,
  description,
  sx,
  me,
  ...restProps
}: PageSectionProps) {
  return (
    <Box
      {...restProps}
      sx={{ position: "relative", zIndex: 1, pr: 2, py: 2, ...sx }}>
      {(!!heading || !!description) && (
        <SectionHeading
          type="content"
          heading={heading}
          description={description}
          variant="h3"
          sx={{ mb: 4 }}
        />
      )}
      {children}
    </Box>
  );
}
