"use client";

import {
  Box,
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  TextFieldProps,
  useTheme,
} from "@mui/material";
import React, { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface FormControlHorizontalProps
  extends Omit<FormControlProps, "error"> {
  id: string;
  label?: ReactNode;
  error?: FieldError;
  labelProps?: FormLabelProps;
}

export default function FormControlHorizontal({
  children,
  label,
  error,
  id,
  disabled,
  labelProps,
  ...restProps
}: FormControlHorizontalProps) {
  const theme = useTheme();

  const mdBreakpoint = theme.breakpoints.down("md");

  return (
    <FormControl
      error={!!error}
      disabled={disabled}
      size="small"
      fullWidth
      {...restProps}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          [mdBreakpoint]: {
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
          },
        }}>
        <FormLabel
          htmlFor={id}
          sx={{
            wordWrap: "break-word",
            minWidth: 200,
            width: 200,
            ...labelProps?.sx,
          }}
          {...labelProps}>
          {label}
        </FormLabel>
        <Box
          sx={{
            flexGrow: 1,
            [mdBreakpoint]: {
              width: "100%",
              "> div": {
                width: "100%",
              },
            },
          }}>
          {React.Children.map(children, child => {
            if (!React.isValidElement<TextFieldProps>(child)) {
              return child;
            }

            return React.cloneElement<TextFieldProps>(child, {
              id,
              disabled,
            });
          })}
          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </Box>
      </Box>
    </FormControl>
  );
}
