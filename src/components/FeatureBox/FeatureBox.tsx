"use client";

import { Paper, PaperProps, useTheme } from "@mui/material";
import { Children, ReactNode, cloneElement, isValidElement } from "react";

export type FeatureBoxProps = PaperProps;

export default function FeatureBox({
  children,
  ...restProps
}: FeatureBoxProps) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      {...restProps}
      sx={{
        display: "flex",
        p: 1,
        [theme.breakpoints.down("md")]: {
          display: "block",
          "> div": {
            width: "100%",
          },
        },
      }}>
      {Children.map<ReactNode, ReactNode>(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            color: restProps.color,
          } as Partial<PaperProps>);
        }
        return child;
      })}
    </Paper>
  );
}
