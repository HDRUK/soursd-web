"use client";

import { BoxProps } from "@mui/material";
import { StyledPageSection } from "./PageSection.styles";

type PageContentProps = BoxProps;

export default function PageSection({
  children,
  ...restProps
}: PageContentProps) {
  return <StyledPageSection {...restProps}>{children}</StyledPageSection>;
}
