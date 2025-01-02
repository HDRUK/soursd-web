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
        <>
          <FormSection heading={section.sectionTitle} />
          <Box sx={section.sectionBoxSx}>
            {section.fields.map(fieldConfig => (
              <Box>
                <RenderFormField
                  key={fieldConfig.name}
                  fieldConfig={fieldConfig}
                  control={control}
                />
              </Box>
            ))}
          </Box>
        </>
      ))}
    </>
  );
}
