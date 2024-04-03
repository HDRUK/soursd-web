"use client";

import { DetailedHTMLProps, HTMLAttributes } from "react";
import { StyledPageDecoration } from "./PageDecoration.styles";

type PageDecorationProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function PageDecoration({
  children,
  ...restProps
}: PageDecorationProps) {
  return <StyledPageDecoration {...restProps}>{children}</StyledPageDecoration>;
}
