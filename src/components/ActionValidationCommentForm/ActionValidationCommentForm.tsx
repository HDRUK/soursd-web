import { Box, Button } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { VerifyIcon, RejectIcon } from "@/consts/icons";
import yup from "@/config/yup";
import { ValidationLogAction } from "@/services/validation_logs/types";
import { LoadingButton } from "@mui/lab";
import { useTranslations } from "next-intl";
import Form from "../Form";
import FormControlWrapper from "../FormControlWrapper";

export interface ActionValidationCommentFormData {
  comment: string;
}

interface ActionValidationCommentFormProps {
  onSubmit: (data: ActionValidationCommentFormData) => void;
  isLoading?: boolean;
  selectedAction: ValidationLogAction;
  setSelectedAction: React.Dispatch<
    React.SetStateAction<ValidationLogAction | null>
  >;
}
const NAMESPACE_TRANSLATION_FORM = "ActionValidationCommentForm";
export default function ActionValidationCommentForm({
  onSubmit,
  isLoading = false,
  selectedAction,
  setSelectedAction,
}: ActionValidationCommentFormProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_FORM);

  const schema = yup.object().shape({
    comment: yup.string().required(),
  });

  const formOptions = {
    defaultValues: {
      comment: "",
    },
  };

  return (
    <Form onSubmit={onSubmit} schema={schema} {...formOptions}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 4 }}>
        <FormControlWrapper
          name="comment"
          renderField={fieldProps => (
            <TextareaAutosize
              defaultValue={fieldProps.value}
              style={{ width: "100%" }}
              minRows={8}
              {...fieldProps}
            />
          )}
        />
        <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setSelectedAction(null)}>
            {t("cancel")}
          </Button>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            color={
              selectedAction === ValidationLogAction.PASS ? "success" : "error"
            }
            startIcon={
              selectedAction === ValidationLogAction.PASS ? (
                <VerifyIcon sx={{ color: "white" }} />
              ) : (
                <RejectIcon sx={{ color: "white" }} />
              )
            }>
            {t("confirm", { action: selectedAction })}
          </LoadingButton>
        </Box>
      </Box>
    </Form>
  );
}
