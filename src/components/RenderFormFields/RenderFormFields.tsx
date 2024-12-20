import { FormFieldsConfig } from "@/types/forms";
import { Control, FieldValues } from "react-hook-form";
import RenderFormField from "../RenderFormField/RenderFormField";

export default function RenderFormFields({
  config,
  control,
}: {
  config: FormFieldsConfig;
  control: Control<FieldValues>;
}) {
  return (
    <>
      {Object.entries(config).map(([key, fieldConfig]) => {
        return (
          <RenderFormField
            key={key}
            fieldConfig={fieldConfig}
            control={control}
          />
        );
      })}
    </>
  );
}
