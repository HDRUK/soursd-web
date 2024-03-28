"use client";

import { HTMLAttributes, PropsWithChildren } from "react";
import { StyledPageLayout } from "./PageLayout.styles";

type PageLayoutProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function PageLayout({
  children,
  ...restProps
}: PageLayoutProps) {
  return <StyledPageLayout {...restProps}>{children}</StyledPageLayout>;
}
