import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Rule } from "../../types/rules";
import Form from "..//Form";
import FormControl from "..//FormControlWrapper";
import FormActions from "..//FormActions";
import FormModal from "..//FormModal";
import FormSection from "..//FormSection";

interface AddEditCheckboxItemProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Rule) => Promise<void>;
  initialData?: Rule;
  title: string;
}

const NAMESPACE_TRANSLATION = "AddEditCheckboxItem";

const AddEditCheckboxItem = ({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
}: AddEditCheckboxItemProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const schema = useMemo(
    () =>
      yup.object().shape({
        text: yup.string().required(t("textRequired")),
      }),
    [t]
  );

  const defaultValues = useMemo(
    () => ({
      text: initialData?.text || "",
    }),
    [initialData]
  );

  const handleSubmit = async (formData: Partial<Rule>) => {
    const payload: Rule = { ...initialData, ...formData } as Rule;
    await onSubmit(payload);
    onClose();
  };

  return (
    <FormModal open={open} onClose={onClose} sx={{ minWidth: 600 }}>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}>
        <FormSection heading={title}>
          <FormControl
            name="text"
            label={t("label")}
            renderField={fieldProps => <TextField {...fieldProps} fullWidth />}
          />
          <FormActions>
            <LoadingButton variant="outlined" onClick={onClose}>
              {t("cancel")}
            </LoadingButton>
            <LoadingButton type="submit" variant="contained">
              {t("save")}
            </LoadingButton>
          </FormActions>
        </FormSection>
      </Form>
    </FormModal>
  );
};

export default AddEditCheckboxItem;
