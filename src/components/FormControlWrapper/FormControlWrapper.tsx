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
  label?: string;
  control?: Control;
  placeholder?: string;
  displayLabel?: boolean;
  displayPlaceholder?: boolean;
  fullWidth?: boolean;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

export default function FormControlWrapper({
  name,
  control,
  label,
  placeholder,
  description,
  displayPlaceholder = true,
  displayLabel = true,
  renderField,
  fullWidth = true,
  sx = {
    m: 0,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
  },
}: FormControlProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const tKey = name?.replace(/_([a-zA-Z0-9])/g, g => g[1].toUpperCase());

  const context = useFormContext() as ExtendedUseFormReturn<FieldValues>;
  const effectiveControl = control || context.control;

  const { isFieldRequired } = context;
  const isRequired = isFieldRequired?.(name);

  return (
    <Controller
      name={name}
      control={effectiveControl}
      render={({
        field: { ref, ...field },
        fieldState: { invalid, error },
      }) => (
        <FormControl sx={sx} fullWidth={fullWidth} error={invalid}>
          {displayLabel && (
            <FormLabel htmlFor={field.name} sx={{ pb: 1 }}>
              {label || t(tKey)}
              {isRequired && <span style={{ color: "red" }}>*</span>}
            </FormLabel>
          )}
          {renderField({
            id: field.name,
            inputRef: ref,
            error: invalid,
            placeholder: displayPlaceholder
              ? placeholder || t(`${tKey}Placeholder`)
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
