"use client";

import { toCamelCase } from "@/utils/string";
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
  Path,
} from "react-hook-form";

export type RootError = { type?: string; message?: string };

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
  displayLabel?: boolean;
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
  displayLabel = true,
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

  const {
    setError,
    formState: { errors },
  } = context;

  const rootErrors = errors[name]?.root as RootError | undefined;
  useEffect(() => {
    if (!rootErrors) return;
    const fieldName = rootErrors?.type as string;
    fieldsArray.forEach((_, index) => {
      setError(`${name}.${index}.${fieldName}` as Path<T>, {
        type: "manual",
      });
    });
  }, [rootErrors]);

  return (
    <div>
      {displayLabel && <Typography>{t(toCamelCase(name))}</Typography>}
      <Box sx={{ pb: 1, gap: 2, display: "flex", flexDirection: "column" }}>
        {fieldsArray.map((field, index) => (
          <Box key={field.id} sx={{ gap: 3, ...boxSx }}>
            {renderField(field, index)}
            <Box
              sx={{
                mt: 4,
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
        {rootErrors?.message && (
          <Typography color="error">{rootErrors.message}</Typography>
        )}

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
