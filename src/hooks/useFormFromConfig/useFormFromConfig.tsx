import { useMemo } from "react";
import { generateSchema, generateDefaultValues } from "@/utils/yup";
import { useForm, UseFormReturn } from "react-hook-form";
import { FormConfig } from "@/types/forms";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useFormFromConfig<T>(
  formFieldsConfig: FormConfig
): UseFormReturn<Partial<T>> {
  const schema = useMemo(
    () => generateSchema(formFieldsConfig),
    [formFieldsConfig]
  );

  return useForm<Partial<T>>({
    resolver: yupResolver(schema),
    defaultValues: generateDefaultValues(formFieldsConfig),
  });
}
