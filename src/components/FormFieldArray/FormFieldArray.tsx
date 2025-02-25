"use client";

import { Button, Box, SxProps, Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
    alignItems: "center"
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
  }, []);

  return (
    <Box sx={{ pb: 1, gap: 2, display: "flex", flexDirection: "column" }}>
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
            <Tooltip title={removeButtonLabel || t("arrayRemoveButton")}>
              <IconButton
                disabled={minimumRows && fieldsArray.length <= minimumRows}
                onClick={() => remove(index)}
                data-testid="remove-from-field-array-button">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-start" }}>
        <Button onClick={handleAddRow} variant="outlined" color="primary">
          {addButtonLabel || (fieldsArray.length === 0 ? t("arrayAddButton") : t("arrayAddAnotherButton"))}
        </Button>
      </Box>
    </Box>
  );
};

export default FormFieldArray;
