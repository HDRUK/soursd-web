import { Box, BoxProps, Typography } from "@mui/material";
import PageTitle from "../PageTitle";
import { ReactNode } from "react";
import SectionHeading, {
  SectionHeadingProps,
} from "@/components/SectionHeading";

type PageBodyContainerProps = BoxProps & SectionHeadingProps;

export default function PageBodyContainer({
  children,
  heading,
  description,
  ...restProps
}: PageBodyContainerProps) {
  return (
    <Box {...restProps} sx={{ p: 2 }}>
      <SectionHeading
        type="content"
        variant="h1"
        heading={heading}
        description={description}
        size="large"
        sx={{
          mb: 4,
        }}
      />
      {children}
    </Box>
  );
}
