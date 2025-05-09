import { useTranslations } from "next-intl";
import yup from "@/config/yup";
import Form from "@/components/Form";
import { Grid, Box } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import FormControl from "@/components/FormControlWrapper";
import { LoadingButton } from "@mui/lab";
import { useState, useMemo, useEffect } from "react";
import SelectValidationActionStatus from "@/components/SelectValidationActionStatus";
import { ApprovalResponse } from "@/services/approvals";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";

export interface ActionValidationStatusFormValues {
  status: number;
  comment: string;
}

export type UseApprovalHook<TParams> = (params: TParams) => {
  data?: ApprovalResponse;
  approve: (comment: string) => void;
  reject: (comment: string) => void;
  isLoading: boolean;
  isError?: boolean;
};

interface ActionValidationStatusProps<TParams> {
  useApprovalHook: UseApprovalHook<TParams>;
  hookParams: TParams;
}

const ActionValidationStatus = <TParams,>({
  useApprovalHook,
  hookParams,
}: ActionValidationStatusProps<TParams>) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
  const { data, approve, reject, isLoading } = useApprovalHook(hookParams);

  const schema = yup.object().shape({
    status: yup.number().required(),
    comment: yup.string().required(),
  });

  const [initialStatus, setInitialStatus] = useState(0);

  useEffect(() => {
    if (isLoading) return;
    setInitialStatus(data?.approved || 0);
  }, [data]);

  const [currentStatus, setCurrentStatus] = useState(0);
  useEffect(() => {
    setCurrentStatus(initialStatus);
  }, [initialStatus]);

  const formOptions = useMemo(
    () => ({
      shouldReset: false,
      defaultValues: {
        status: initialStatus,
        comment: "",
      },
    }),
    [initialStatus]
  );

  const handleSubmit = (formData: ActionValidationStatusFormValues) => {
    const { status, comment } = formData;
    if (status === 1) {
      approve(comment);
    } else {
      reject(comment);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Form schema={schema} onSubmit={handleSubmit} {...formOptions}>
        <Grid item xs={12}>
          <FormControl
            name="status"
            renderField={fieldProps => (
              <SelectValidationActionStatus
                isLoading={isLoading}
                {...fieldProps}
                handleChange={(value: number) => setCurrentStatus(value)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            name="comment"
            renderField={fieldProps => (
              <TextareaAutosize
                id="comment"
                value={fieldProps.value}
                onChange={fieldProps.onChange}
                placeholder={fieldProps?.placeholder}
                style={{ width: "100%" }}
                minRows={8}
              />
            )}
          />
        </Grid>
        {/* note: to be implemented in the future to upload some sort of evidence?
        <Grid container item spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <FileLink
              fileButtonText={file?.name || "Select files"}
              fileNameText={file?.name}
              {...uploadRest}
              includeStatus
            />
          </Grid>
        </Grid>
        */}
        <Grid item xs={12}>
          <LoadingButton
            loading={isLoading}
            disabled={currentStatus === initialStatus}
            type="submit"
            sx={{ display: "flex", justifySelf: "end" }}>
            {t("updateStatusButton")}
          </LoadingButton>
        </Grid>
      </Form>
    </Box>
  );
};

export default ActionValidationStatus;
