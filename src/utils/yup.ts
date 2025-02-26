import yup from "@/config/yup";
import { DefaultValues } from "react-hook-form";
import { FormConfig } from "@/types/forms";

const generateSchema = (config: FormConfig) =>
  yup.object().shape(
    config.reduce(
      (schema, section) => {
        section.fields.forEach(fieldConfig => {
          if (fieldConfig.validation) {
            schema[fieldConfig.name] = fieldConfig.validation;
          }
        });
        return schema;
      },
      {} as Record<string, yup.AnySchema>
    )
  );

const generateDefaultValues = <T>(
  config: FormConfig
): DefaultValues<Partial<T>> =>
  config.reduce(
    (defaultValues, section) => {
      section.fields.forEach(field => {
        defaultValues[field.name as string] = field.defaultValue;
      });
      return defaultValues;
    },
    {} as DefaultValues<Partial<T>>
  );

export { generateSchema, generateDefaultValues };
