import yup from "@/config/yup";
import { DefaultValues } from "react-hook-form";
import { FormFieldsConfig } from "@/types/forms";

const generateSchema = (config: FormFieldsConfig) =>
  yup.object().shape(
    config.reduce(
      (schema, fieldConfig) => {
        if (fieldConfig.validation) {
          schema[fieldConfig.name] = fieldConfig.validation;
        }
        return schema;
      },
      {} as Record<string, yup.AnySchema>
    )
  );

const generateDefaultValues = <T>(
  config: FormFieldsConfig
): DefaultValues<Partial<T>> =>
  Object.fromEntries(
    Object.entries(config).map(([key, val]) => [key, val.defaultValue])
  ) as DefaultValues<Partial<T>>;

export { generateSchema, generateDefaultValues };
