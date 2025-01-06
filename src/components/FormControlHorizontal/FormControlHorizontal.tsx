"use client";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Grid,
  GridProps,
  TextFieldProps,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { FormFieldProps } from "../FormField";

export interface FormControlHorizontalProps
  extends Omit<FormControlProps, "error"> {
  renderField?: (fieldProps: FormFieldProps) => ReactNode;
  id?: string;
  placeholder?: string;
  label?: ReactNode;
  error?: FieldError;
  labelProps?: FormLabelProps;
  labelMd?: number;
  contentMd?: number;
  containerProps?: GridProps;
  displayLabel?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormControlHorizontal({
  children,
  label,
  placeholder,
  error,
  id,
  disabled,
  labelProps,
  containerProps,
  labelMd = 3,
  contentMd = 9,
  displayLabel = true,
  renderField,
  ...restProps
}: FormControlHorizontalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const tKey = id?.replace(/_([a-zA-Z0-9])/g, function (g) {
    return g[1].toUpperCase();
  });

  return (
    <FormControl
      error={!!error}
      disabled={disabled}
      size="small"
      fullWidth
      {...restProps}>
      <Grid container columnSpacing={2} {...containerProps}>
        <Grid item md={labelMd} sx={{ display: "flex", pt: 1 }}>
          <FormLabel
            htmlFor={id}
            {...labelProps}
            sx={{
              ...labelProps?.sx,
              mb: {
                xs: 0.5,
                md: 0,
              },
              visibility: displayLabel ? "visible" : "hidden",
            }}>
            {label || t(tKey)}
          </FormLabel>
        </Grid>
        <Grid item xs={12} md={contentMd}>
          {renderField
            ? renderField({
                placeholder: placeholder || t(`${tKey}Placeholder`),
                disabled,
                id,
                name: id,
                fullWidth: true,
              })
            : React.Children.map(children, child => {
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
