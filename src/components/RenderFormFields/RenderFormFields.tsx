import { FormConfig } from "@/types/forms";
import { Control, FieldValues } from "react-hook-form";
import { Box } from "@mui/material";
import RenderFormField from "../RenderFormField/RenderFormField";
import FormSection from "../FormSection";

export default function RenderFormFields({
  config,
  control,
}: {
  config: FormConfig;
  control: Control<FieldValues>;
}) {
  return (
    <>
      {config.map(section => (
        <div key={`form.wrapper.${section.sectionId}`}>
          <FormSection
            key={`form.section.${section.sectionId}`}
            heading={section.sectionTitle}
          />
          <Box key={`form.box.${section.sectionId}`} sx={section.sectionBoxSx}>
            {section.fields?.map(fieldConfig => (
              <Box key={`form.box.${section.sectionId}.${fieldConfig.name}`}>
                <RenderFormField
                  key={`form.field.${section.sectionId}.${fieldConfig.name}`}
                  fieldConfig={fieldConfig}
                  control={control}
                />
              </Box>
            ))}
          </Box>
        </div>
      ))}
    </>
  );
}
