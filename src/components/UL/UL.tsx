"use client";

import {
  Box,
  BoxProps,
  Breakpoints,
  CardActions,
  CardContent,
  Divider,
  Paper,
  PaperProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ReactNode } from "react";

export interface ULProps extends BoxProps {
  children: ReactNode;
  separator?: string;
  variant: "vertical" | "horizontal";
  respsonsiveProps?: Breakpoints;
}

export default function UL({
  separator = "|",
  variant = "vertical",
  children,
  ...restProps
}: ULProps) {
  return (
    <Box
      component="ul"
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: variant === "vertical" ? "column" : "row",
        alignItems: "center",
        listStyle: "none",
        padding: 0,
        "> li": {
          p: "0 12px",
          position: "relative",
          "&:after": {
            position: "absolute",
            right: "-4px",
            top: "50%",
            transform: "translateY(-50%)",
            content: `"${separator}"`,
          },
          "&:first-child": {
            pl: 0,
          },
          "&:last-child:after": {
            content: '""',
          },
        },
        ...(respsonsiveProps && Object.keys(respsonsiveProps).map(() => "1")),
        ...restProps?.sx,
      }}>
      {children}
    </Box>
  );
}
