"use client";

import { Button, Box } from "@mui/material";
import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { useEffect, useRef } from "react";
import { FormFieldsConfig, FormDefaultValue } from "@/types/forms";
import RenderFormField from "@/components/RenderFormField";

const createDefaultValues = (fields: FormFieldsConfig) => {
  return fields.reduce(
    (acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    },
    {} as Record<string, FormDefaultValue>
  );
};

interface FormFieldArrayProps {
  fields: FormFieldsConfig;
  control: Control<FieldValues>;
  name: string;
  removeButtonLabel: string;
  addButtonLabel: string;
}

const FormFieldArray = ({
  fields,
  control,
  name,
  removeButtonLabel,
  addButtonLabel,
}: FormFieldArrayProps) => {
  const {
    fields: fieldsArray,
    append,
    remove,
  } = useFieldArray({
    control,
    name,
  });

  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && fieldsArray.length === 0) {
      initialized.current = true;
      append(createDefaultValues(fields));
    }
  }, [fieldsArray, append, fields]);

  const handleAddRow = () => {
    append(createDefaultValues(fields));
  };

  return (
    <Box sx={{ p: 1, gap: 2 }}>
      {fieldsArray.map((field, index) => (
        <Box
          key={field.id}
          display="flex"
          flexDirection="row"
          gap={2}
          alignItems="center">
          {fields.map(fieldConfig => (
            <RenderFormField
              // eslint-disable-next-line react/no-array-index-key
              key={`${name}.${index}.${fieldConfig.name}`}
              control={control}
              fieldConfig={{
                ...fieldConfig,
                name: `${name}.${index}.${fieldConfig.name}`,
              }}
            />
          ))}
          <Button
            disabled={fieldsArray.length < 2}
            onClick={() => remove(index)}>
            {removeButtonLabel}
          </Button>
        </Box>
      ))}
      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleAddRow} variant="contained" color="primary">
          {addButtonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default FormFieldArray;
