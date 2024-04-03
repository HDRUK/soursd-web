"use client";

import { HTMLAttributes, PropsWithChildren } from "react";
import { StyledPageContent } from "./PageContent.styles";

type PageContentProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function PageLayout({
  children,
  ...restProps
}: PageContentProps) {
  return <StyledPageContent {...restProps}>{children}</StyledPageContent>;
}
