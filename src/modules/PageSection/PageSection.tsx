"use client";

import { BoxProps } from "@mui/material";
import { StyledPageContent } from "./PageSection.styles";

type PageContentProps = BoxProps;

export default function PageLayout({
  children,
  ...restProps
}: PageContentProps) {
  return <StyledPageContent {...restProps}>{children}</StyledPageContent>;
}
