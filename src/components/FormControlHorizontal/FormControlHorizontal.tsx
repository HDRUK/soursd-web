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
import {
  useFormContext,
  useController,
  Control,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";

export interface FormControlHorizontalProps
  extends Omit<FormControlProps, "error"> {
  renderField: (fieldProps: FieldValues) => ReactNode;
  name: string;
  control?: Control;
  placeholder?: string;
  label?: ReactNode;
  error?: FieldError;
  labelProps?: FormLabelProps;
  labelMd?: number;
  contentMd?: number;
  containerProps?: GridProps;
  displayLabel?: boolean;
  displayPlaceholder?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormControlHorizontal({
  name,
  control,
  children,
  label,
  placeholder,
  disabled,
  labelProps,
  containerProps,
  labelMd = 3,
  contentMd = 9,
  displayPlaceholder = true,
  displayLabel = true,
  renderField,
  ...restProps
}: FormControlHorizontalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const tKey = name?.replace(/_([a-zA-Z0-9])/g, function (g) {
    return g[1].toUpperCase();
  });

  const context = useFormContext();
  const effectiveControl = control || context.control;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: effectiveControl,
  });

  return (
    <FormControl
      disabled={disabled}
      size="small"
      fullWidth
      {...restProps}
      error={!!error}>
      <Grid container columnSpacing={2} {...containerProps}>
        <Grid item md={labelMd} sx={{ display: "flex", pt: 1 }}>
          <FormLabel
            htmlFor={name}
            {...labelProps}
            sx={{
              ...labelProps?.sx,
              mb: {
                xs: 0.5,
                md: 0,
              },
              visibility: displayLabel ? "visible" : "hidden",
            }}>
            {displayLabel && (label || t(tKey))}
          </FormLabel>
        </Grid>
        <Grid item xs={12} md={contentMd}>
          {renderField({
            placeholder:
              displayPlaceholder && (placeholder || t(`${tKey}Placeholder`)),
            disabled,
            fullWidth: true,
            ...field,
          })}

          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  );
}
