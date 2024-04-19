"use client";

import { PaperProps } from "@mui/material";
import { Children, ReactNode, cloneElement, isValidElement } from "react";
import { StyledFeatureBox } from "./FeaturesBox.styles";

export type FeatureBoxProps = PaperProps;

export default function FeatureBox({
  children,
  elevation = 0,
  color = "primary",
  ...restProps
}: FeatureBoxProps) {
  return (
    <StyledFeatureBox elevation={elevation} color={color} {...restProps}>
      {Children.map<ReactNode, ReactNode>(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            color,
          } as Partial<PaperProps>);
        }
        return child;
      })}
    </StyledFeatureBox>
  );
}
