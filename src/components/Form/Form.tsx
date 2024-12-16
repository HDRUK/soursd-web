import { Box, BoxProps } from "@mui/material";
import { HTMLAttributes } from "react";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  autoComplete?: "off";
  sx?: BoxProps["sx"];
}

export default function Form({ children, ...restProps }: FormProps) {
  return (
    <Box
      component="form"
      {...restProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        ...restProps.sx,
      }}>
      {children}
    </Box>
  );
}
