"use client";

import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Grid,
  GridProps,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import {
  FieldError,
  useFormContext,
  useController,
  Control,
  FieldValues,
} from "react-hook-form";
import { ExtendedUseFormReturn } from "../Form/Form";

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
  fullWidth = true,
  ...restProps
}: FormControlHorizontalProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const tKey = name?.replace(/_([a-zA-Z0-9])/g, function (g) {
    return g[1].toUpperCase();
  });

  const context = useFormContext() as ExtendedUseFormReturn<FieldValues>;
  const effectiveControl = control || context.control;

  const { isFieldRequired } = context;

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control: effectiveControl,
  });

  const isRequired = isFieldRequired(name);

  return (
    <FormControl
      disabled={disabled}
      size="small"
      {...restProps}
      fullWidth={fullWidth}
      error={!!error}>
      <Grid container columnSpacing={2} {...containerProps}>
        <Grid item md={labelMd} sx={{ display: "flex", pt: 1 }}>
          <FormLabel
            id={`${field.name}-label`}
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
            {isRequired && <span style={{ color: "red" }}>*</span>}
          </FormLabel>
        </Grid>
        <Grid item xs={12} md={contentMd}>
          {renderField({
            id: field.name,
            placeholder: displayPlaceholder
              ? placeholder || t(`${tKey}Placeholder`)
              : "",
            disabled,
            fullWidth,
            "data-testid": field.name,
            "aria-labelledby": `${field.name}-label`,
            ...field,
          })}

          {!!error && <FormHelperText>{error.message}</FormHelperText>}
        </Grid>
      </Grid>
    </FormControl>
  );
}
