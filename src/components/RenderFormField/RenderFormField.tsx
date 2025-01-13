import { FormFieldConfig } from "@/types/forms";
import { ComponentType } from "react";
import { useController, Control, FieldValues } from "react-hook-form";
import FormControlHorizontal from "../FormControlHorizontal";

interface RenderFormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldConfig: FormFieldConfig<ComponentType<any>>;
  control: Control<FieldValues>;
}

export default function RenderFormField({
  fieldConfig,
  control,
}: RenderFormFieldProps) {
  const {
    name,
    label,
    component: Component,
    componentProps,
    formControlProps,
    defaultValue,
  } = fieldConfig;

  const {
    field: { ref: _unsuedRef, ...field },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <FormControlHorizontal label={label} error={error} {...formControlProps}>
      <Component control={control} {...field} {...componentProps} />
    </FormControlHorizontal>
  );
}
