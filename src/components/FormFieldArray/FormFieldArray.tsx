"use client";

import { toCamelCase } from "../../utils/string";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import {
  ArrayPath,
  Control,
  FieldArray,
  FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

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
  disabled?: boolean;
  tKey?: string;
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
  disabled,
  tKey = NAMESPACE_TRANSLATION_FORM,
}: FormFieldArrayProps<T>) => {
  const t = useTranslations(tKey);
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

  const isDisabled = context.formState.disabled || disabled;

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
    <div>
      <Typography>{t(toCamelCase(name))}</Typography>
      <Box sx={{ pb: 1, gap: 2, display: "flex", flexDirection: "column" }}>
        {fieldsArray.map((field, index) => (
          <Box key={field.id} sx={{ gap: 3, ...boxSx }}>
            {renderField(field, index)}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}>
              <Tooltip title={removeButtonLabel || t("arrayRemoveButton")}>
                <IconButton
                  disabled={
                    isDisabled ||
                    !!(minimumRows && fieldsArray.length <= minimumRows)
                  }
                  onClick={() => remove(index)}
                  data-testid="remove-from-field-array-button">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ))}

        <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-start" }}>
          <Button
            onClick={handleAddRow}
            variant="outlined"
            color="primary"
            disabled={isDisabled}>
            {addButtonLabel ||
              (fieldsArray.length === 0
                ? t("arrayAddButton")
                : t("arrayAddAnotherButton"))}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default FormFieldArray;
