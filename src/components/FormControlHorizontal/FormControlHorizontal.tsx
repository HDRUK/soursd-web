"use client";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Grid,
  TextFieldProps,
} from "@mui/material";
import React, { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export interface FormControlHorizontalProps
  extends Omit<FormControlProps, "error"> {
  id?: string;
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
  return (
    <FormControl
      error={!!error}
      disabled={disabled}
      size="small"
      fullWidth
      {...restProps}>
      <Grid container columnSpacing={2}>
        <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
          {label && (
            <FormLabel
              htmlFor={id}
              {...labelProps}
              sx={{
                ...labelProps?.sx,
                mb: {
                  xs: 0.5,
                  md: 0,
                },
              }}>
              {label}
            </FormLabel>
          )}
        </Grid>
        <Grid item xs={12} md={9}>
          {React.Children.map(children, child => {
            if (!React.isValidElement<TextFieldProps>(child)) {
              return child;
            }

            return React.cloneElement<TextFieldProps>(child, {
              id,
              disabled,
              fullWidth: true,
            });
          })}
          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  );
}
