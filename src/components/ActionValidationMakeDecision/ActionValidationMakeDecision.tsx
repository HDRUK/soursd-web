import { Box, Button, Chip } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { ValidationLog, Comment } from "@/types/logs";
import { VerifyIcon, RejectIcon } from "@/consts/icons";
import yup from "@/config/yup";
import {
  postValidationLogCommentQuery,
  putValidationLogQuery,
} from "@/services/validation_logs";
import { useStore } from "@/data/store";
import { ValidationLogAction } from "@/services/validation_logs/types";
import { LoadingButton } from "@mui/lab";
import Form from "../Form";
import FormControlWrapper from "../FormControlWrapper";

interface ActionValidationMakeDecisionProps {
  log: ValidationLog;
  onAction?: () => void;
}

interface FormData {
  comment: string;
}

export default function ActionValidationMakeDecision({
  log,
  onAction,
}: ActionValidationMakeDecisionProps) {
  const { id: logId, completed_at, manually_confirmed } = log;

  const [completedAt, setCompletedAt] = useState<string | null>(completed_at);
  const [passed, setPassed] = useState<boolean | null>(
    completedAt ? manually_confirmed === 1 : null
  );

  const user = useStore(store => store.getUser());
  const { mutateAsync: createComment } = useMutation(
    postValidationLogCommentQuery()
  );

  const { mutateAsync: updateLog, isPending } = useMutation(
    putValidationLogQuery(logId)
  );

  const [selectedAction, setSelectedAction] =
    useState<ValidationLogAction | null>(null);

  const schema = yup.object().shape({
    comment: yup.string().required(),
  });

  const formOptions = {
    defaultValues: {
      comment: "",
    },
  };

  const onSubmit = (data: FormData) => {
    if (!selectedAction) return;
    updateLog(selectedAction).then(res => {
      setCompletedAt(res.data.completed_at);
      setPassed(selectedAction === ValidationLogAction.PASS);
      createComment({
        user_id: user?.id as number,
        validation_log_id: logId,
        comment: data.comment,
      }).then(() => {
        onAction?.();
        setSelectedAction(null);
      });
    });
  };

  const getChipProps = () => {
    return passed
      ? {
          icon: <VerifyIcon sx={{ color: "white" }} />,
          label: "Passed",
          color: "success",
        }
      : {
          icon: <RejectIcon sx={{ color: "white" }} />,
          label: "Failed",
          color: "error",
        };
  };

  if (selectedAction) {
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
          <Box
            sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={() => setSelectedAction(null)}>
              Cancel
            </Button>
            <LoadingButton
              loading={isPending}
              type="submit"
              variant="contained"
              color={
                selectedAction === ValidationLogAction.PASS
                  ? "success"
                  : "error"
              }
              startIcon={
                selectedAction === ValidationLogAction.PASS ? (
                  <VerifyIcon sx={{ color: "white" }} />
                ) : (
                  <RejectIcon sx={{ color: "white" }} />
                )
              }>
              Confirm {selectedAction}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    );
  }

  if (completedAt) {
    const chipProps = getChipProps();
    return (
      <Box
        sx={{
          mt: 4,
          display: "flex",
          gap: 1,
          justifyContent: "space-between",
        }}>
        <Chip {...chipProps} />
        <Button
          variant="outlined"
          onClick={() =>
            setSelectedAction(
              passed ? ValidationLogAction.FAIL : ValidationLogAction.PASS
            )
          }>
          Change Decision
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 4 }}>
      <Button
        onClick={() => setSelectedAction(ValidationLogAction.PASS)}
        variant="outlined"
        startIcon={<VerifyIcon fill="inherit" color="inherit" />}>
        Pass
      </Button>
      <Button
        onClick={() => setSelectedAction(ValidationLogAction.FAIL)}
        variant="outlined"
        startIcon={<RejectIcon />}>
        Fail
      </Button>
      <Button variant="outlined">&#8230;</Button>
    </Box>
  );
}
