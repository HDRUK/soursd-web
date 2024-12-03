import { Box, BoxProps } from "@mui/material";
import React from "react";

const SIZES = {
  medium: "default",
  large: "30px",
  xlarge: "40px",
};

interface IconProps {
  children: JSX.Element;
  size?: "medium" | "large" | "xlarge";
  sx?: BoxProps["sx"];
}

export default function Icon({ size = "medium", children, sx }: IconProps) {
  const fontSize = SIZES[size];

  return React.cloneElement(children, {
    sx:
      fontSize !== "default"
        ? {
            fontSize,
            ...sx,
          }
        : sx,
  });
}
