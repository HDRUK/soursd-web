"use client";

import { Button, Box, SxProps } from "@mui/material";
import { useEffect } from "react";
import {
  Control,
  useFormContext,
  FieldValues,
  FieldArray,
  ArrayPath,
  useFieldArray,
} from "react-hook-form";
import { useTranslations } from "next-intl";

interface FormFieldArrayProps<
  T extends FieldValues,
  F = FieldArray<T, ArrayPath<T>>,
> {
  name: ArrayPath<T>;
  control?: Control<T>;
  createNewRow?: () => F;
  renderField: (field: F, index: number) => React.ReactNode;
  removeButtonLabel?: string;
  addButtonLabel?: string;
  boxSx?: SxProps;
  minimumRows?: number;
  initialRowCount?: number;
}

const NAMESPACE_TRANSLATION_FORM = "Form";

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
    alignItems: "center",
  },
  minimumRows,
  initialRowCount = 0,
}: FormFieldArrayProps<T>) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);
  const context = useFormContext<T>();
  const effectiveControl = control || context.control;

  const {
    fields: fieldsArray,
    append,
    replace,
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

  useEffect(() => {
    if (createNewRow && fieldsArray.length === 0 && initialRowCount > 0) {
      replace(Array.from({ length: initialRowCount }, () => createNewRow()));
    }
  }, [initialRowCount, createNewRow, replace, fieldsArray.length]);

  return (
    <Box sx={{ p: 1, gap: 2, display: "flex", flexDirection: "column" }}>
      {fieldsArray.map((field, index) => (
        <Box key={field.id} sx={{ gap: 2, ...boxSx }}>
          {renderField(field, index)}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 1,
              justifyContent: "flex-end",
            }}>
            <Button
              disabled={minimumRows && fieldsArray.length < minimumRows}
              onClick={() => remove(index)}>
              {removeButtonLabel || t("arrayRemoveButton")}
            </Button>
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleAddRow} variant="contained" color="primary">
          {addButtonLabel || t("arrayAddButton")}
        </Button>
      </Box>
    </Box>
  );
};

export default FormFieldArray;
