"use client";

import { HTMLAttributes } from "react";
import { StyledDecoratorPanel } from "./DecoratorPanel.styles";

type LayoutProps = HTMLAttributes<HTMLDivElement>;

export default function DecoratorPanel({ children }: LayoutProps) {
  return (
    <StyledDecoratorPanel>
      <img src="/purple.wave.svg" alt="Page background" />
      {children}
    </StyledDecoratorPanel>
  );
}
