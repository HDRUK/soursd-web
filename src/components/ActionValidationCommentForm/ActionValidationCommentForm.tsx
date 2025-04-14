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

  console.log("called rerender");

  return (
    <Form onSubmit={onSubmit} schema={schema} {...formOptions}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 4 }}>
        <FormControlWrapper
          name="comment"
          renderField={fieldProps => (
            <TextareaAutosize
              id="comment"
              data-testid="validation-log-comment-field"
              value={fieldProps.value}
              onChange={fieldProps.onChange}
              placeholder={fieldProps?.placeholder}
              style={{ width: "100%" }}
              minRows={8}
            />
          )}
        />
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "space-between",
          }}>
          <Button
            data-testid="validation-log-cancel-confirm-button"
            variant="outlined"
            onClick={() => setSelectedAction(null)}>
            {t("cancel")}
          </Button>
          <LoadingButton
            data-testid="validation-log-confirm-button"
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
