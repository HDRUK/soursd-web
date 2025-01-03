"use client";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Grid,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import { FormFieldProps } from "../FormField";

export interface FormControlHorizontalProps
  extends Omit<FormControlProps, "error"> {
  renderField: (fieldProps: FormFieldProps) => ReactNode;
  id?: string;
  placeholder?: string;
  label?: ReactNode;
  error?: FieldError;
  labelProps?: FormLabelProps;
  displayLabel?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormControlHorizontal({
  label,
  error,
  id,
  disabled,
  labelProps,
  placeholder,
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
      <Grid container columnSpacing={2}>
        <Grid item md={3} sx={{ display: "flex", pt: 1 }}>
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
        <Grid item xs={12} md={9}>
          {renderField({
            placeholder: placeholder || t(`${tKey}Placeholder`),
            disabled,
            id,
            name: id,
            fullWidth: true,
          })}
          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  );
}
