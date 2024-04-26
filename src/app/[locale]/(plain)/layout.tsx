"use client";

import { HTMLAttributes } from "react";
import { StyledLayout } from "./layout.styles";

type LayoutProps = HTMLAttributes<HTMLDivElement>;

export default function Layout({ children }: LayoutProps) {
  return (
    <StyledLayout>
      <img src="/purple.wave.svg" alt="Page background" />
      {children}
    </StyledLayout>
  );
}
