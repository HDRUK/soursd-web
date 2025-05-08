import { useTranslations } from "next-intl";
import ActionsPanel from "@/components/ActionsPanel";
import LoadingWrapper from "@/components/LoadingWrapper";
import { ValidationLog } from "@/types/logs";
import { QueryState } from "@/types/form";
import { Message } from "@/components/Message";
import yup from "@/config/yup";
import Form from "@/components/Form";
import { Grid, Box } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import FormControl from "@/components/FormControlWrapper";
import { LoadingButton } from "@mui/lab";
import { useState, useMemo, useEffect } from "react";
import { useStore } from "@/data/store";
import useProjectUserCustodianApproval from "@/hooks/useProjectUserCustodianApproval";
import SelectValidationActionStatus from "@/components/SelectValidationActionStatus";
import ActionsPanelValidationCheck from "../ActionsPanelValidationCheck";

const NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationStatus";

interface ActionValidationPanelProps {
  logs: ValidationLog[];
  queryState: QueryState;
}

export interface ActionValidationStatusFormValues {
  status: number;
  comment: string;
}

const ActionValidationStatus = () => {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
  const { custodianId, projectId, registryId } = useStore(store => ({
    custodianId: store.getCustodian()?.id,
    projectId: store.getCurrentProject()?.id,
    registryId: store.getCurrentUser()?.registry_id,
  }));

  const { data, approve, reject, isLoading } = useProjectUserCustodianApproval(
    custodianId as number,
    projectId as number,
    registryId as number
  );

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

function ActionValidationPanel({
  logs,
  queryState = { isLoading: false, isError: false },
}: ActionValidationPanelProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
  return (
    <LoadingWrapper variant="basic" loading={queryState?.isLoading || false}>
      <ActionsPanel heading={t("title")}>
        {logs.map(log => (
          <ActionsPanelValidationCheck key={log.id} log={log} />
        ))}
        <ActionValidationStatus />
      </ActionsPanel>
      {queryState.isError && (
        <Message severity="error" sx={{ mb: 3 }}>
          {t(queryState.error)}
        </Message>
      )}
    </LoadingWrapper>
  );
}

export default ActionValidationPanel;
