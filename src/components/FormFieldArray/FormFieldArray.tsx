"use client";

import { Button, Box, SxProps } from "@mui/material";
import { Control, FieldValues, useFieldArray } from "react-hook-form";
import { useEffect, useRef } from "react";
import { FormFieldsConfig, FormDefaultValue } from "@/types/forms";
import RenderFormField from "@/components/RenderFormField";

const addNewRow = (fields: FormFieldsConfig) =>
  fields.reduce(
    (acc, field) => {
      acc[field.name] = "";
      return acc;
    },
    {} as Record<string, FormDefaultValue>
  );

const getMaxRows = (fields: FormFieldsConfig) =>
  Math.max(
    ...fields.map(field =>
      field.defaultValues ? field.defaultValues.length : 0
    )
  );

const createDefaultValues = (fields: FormFieldsConfig) => {
  const maxRows = getMaxRows(fields);
  const rows = Array.from({ length: maxRows }, (_, rowIndex) =>
    fields.reduce(
      (acc, field) => {
        acc[field.name] =
          field.defaultValues && field.defaultValues[rowIndex] !== undefined
            ? field.defaultValues[rowIndex]
            : "";
        return acc;
      },
      {} as Record<string, FormDefaultValue>
    )
  );

  return rows;
};

interface FormFieldArrayProps {
  fields: FormFieldsConfig;
  control: Control<FieldValues>;
  name: string;
  removeButtonLabel: string;
  addButtonLabel: string;
  boxSx: SxProps;
  renderButtons?: boolean;
}

const FormFieldArray = ({
  fields,
  control,
  name,
  removeButtonLabel,
  addButtonLabel,
  boxSx = {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  renderButtons = true,
  ...restProps
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
      if (getMaxRows(fields) < 1) {
        append(addNewRow(fields));
      } else {
        append(createDefaultValues(fields));
      }
    }
  }, [fieldsArray, append, fields]);

  const handleAddRow = () => {
    append(addNewRow(fields));
  };

  return (
    <Box sx={{ p: 1, gap: 2, display: "flex", flexDirection: "column" }}>
      {fieldsArray.map((field, index) => (
        <Box key={field.id} sx={{ gap: 2, ...boxSx }} {...restProps}>
          {fields.map(fieldConfig => (
            <RenderFormField
              // eslint-disable-next-line react/no-array-index-key
              key={`${name}.${index}.${fieldConfig.name}`}
              aria-label={`test-${name}.${index}.${fieldConfig.name}`}
              control={control}
              fieldConfig={{
                ...fieldConfig,
                name: `${name}.${index}.${fieldConfig.name}`,
              }}
            />
          ))}
          {renderButtons && (
            <Button
              disabled={fieldsArray.length < 2}
              onClick={() => remove(index)}>
              {removeButtonLabel}
            </Button>
          )}
        </Box>
      ))}
      {renderButtons && (
        <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleAddRow} variant="contained" color="primary">
            {addButtonLabel}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FormFieldArray;
