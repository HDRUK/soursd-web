"use client";

import {
  FormControl,
  FormControlLabelProps,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { ExtendedUseFormReturn } from "../Form";
import FormControlDescription from "../FormControlDescription";

export interface FormControlProps
  extends Omit<FormControlLabelProps, "control" | "label"> {
  renderField: (fieldProps: FieldValues & { error?: boolean }) => ReactNode;
  name: string;
  description?: ReactNode;
  label?: string | ReactNode;
  control?: Control;
  placeholder?: string;
  displayLabel?: boolean;
  displayPlaceholder?: boolean;
  fullWidth?: boolean;
  t?: ReturnType<typeof useTranslations>;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormControlWrapper({
  name,
  control,
  label,
  placeholder,
  displayPlaceholder = true,
  displayLabel = true,
  renderField,
  fullWidth = true,
  description,
  t,
  disabled,
  sx = {
    m: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
  },
}: FormControlProps) {
  let tForm = useTranslations(NAMESPACE_TRANSLATION_FORM);

  if (t) {
    tForm = t;
  }

  const tKey = name?.replace(/_([a-zA-Z0-9])/g, g => g[1].toUpperCase());

  const context = useFormContext() as ExtendedUseFormReturn<FieldValues>;
  const effectiveControl = control || context.control;

  const { isFieldRequired } = context;
  const isRequired = isFieldRequired?.(name);

  return (
    <Controller
      disabled={context.formState.disabled || disabled}
      name={name}
      control={effectiveControl}
      render={({
        field: { ref, ...field },
        fieldState: { invalid, error },
      }) => (
        <FormControl sx={sx} fullWidth={fullWidth} error={invalid}>
          {displayLabel && (
            <FormLabel htmlFor={field.name} sx={{ pb: 1 }}>
              {label || tForm(tKey)}
              {isRequired && <span style={{ color: "red" }}>*</span>}
            </FormLabel>
          )}
          {renderField({
            id: field.name,
            inputRef: ref,
            error: invalid,
            placeholder: displayPlaceholder
              ? placeholder || tForm(`${tKey}Placeholder`)
              : "",
            fullWidth,
            "data-testid": field.name,
            "aria-labelledby": `${field.name}-label`,
            ...field,
          })}
          {!!description && (
            <FormControlDescription>{description}</FormControlDescription>
          )}
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
