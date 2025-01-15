"use client";

import { Button, Box, SxProps } from "@mui/material";
import {
  Control,
  useFormContext,
  FieldValues,
  FieldArray,
  ArrayPath,
  useFieldArray,
} from "react-hook-form";

interface FormFieldArrayProps<
  T extends FieldValues,
  F = FieldArray<T, ArrayPath<T>>,
> {
  name: ArrayPath<T>;
  control?: Control<T>;
  createNewRow?: () => F;
  renderField: (field: F, index: number) => React.ReactNode;
  removeButtonLabel: string;
  addButtonLabel: string;
  boxSx: SxProps;
}

const FormFieldArray = <T extends FieldValues>({
  control,
  name,
  renderField,
  createNewRow,
  removeButtonLabel,
  addButtonLabel,
  boxSx = {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
}: FormFieldArrayProps<T>) => {
  const context = useFormContext<T>();
  const effectiveControl = control || context.control;

  const {
    fields: fieldsArray,
    append,
    remove,
  } = useFieldArray({
    control: effectiveControl,
    name,
  });

  const handleAddRow = () => {
    if (createNewRow) {
      append(createNewRow());
    }
  };

  return (
    <Box sx={{ p: 1, gap: 2, display: "flex", flexDirection: "column" }}>
      {fieldsArray.map((field, index) => (
        <Box key={field.id} sx={{ gap: 2, ...boxSx }}>
          {renderField(field, index)}
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
