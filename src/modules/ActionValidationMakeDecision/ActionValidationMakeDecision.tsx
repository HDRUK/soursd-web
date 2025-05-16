"use client";

import { Box, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { useStore } from "@/data/store";
import { ValidationLog } from "../../types/logs";
import { useTranslations } from "next-intl";
import { RejectIcon, VerifyIcon } from "../../consts/icons";
import {
  postValidationLogCommentQuery,
  putValidationLogQuery,
} from "../../services/validation_logs";
import { ValidationLogAction } from "../../services/validation_logs/types";
import ActionValidationCommentForm, {
  ActionValidationCommentFormData,
} from "../../components/ActionValidationCommentForm";
import ChangeDecisionChip from "../../components/ChangeDecisionChip";

interface ActionValidationMakeDecisionProps {
  log: ValidationLog;
  onAction?: () => Promise<void>;
}

const NAMESPACE_TRANSLATION_ACTION_VALIDATION_DECISION =
  "ActionValidationMakeDecision";

export default function ActionValidationMakeDecision({
  log,
  onAction,
}: ActionValidationMakeDecisionProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_ACTION_VALIDATION_DECISION);

  const [currentLog, setCurrentLog] = useState<ValidationLog>(log);

  const user = useStore(store => store.getUser());
  const { mutateAsync: createComment, isPending: isPendingPostComment } =
    useMutation(postValidationLogCommentQuery());

  const { mutateAsync: updateLog, isPending: isPendingUpdateLog } = useMutation(
    putValidationLogQuery(currentLog.id)
  );

  const [selectedAction, setSelectedAction] =
    useState<ValidationLogAction | null>(null);

  const onSubmit = async (data: ActionValidationCommentFormData) => {
    if (!selectedAction) return;
    const { comment } = data;
    const res = await updateLog(selectedAction);
    setCurrentLog(res.data);
    await createComment({
      user_id: user?.id as number,
      validation_log_id: res.data.id,
      comment,
    });
    await onAction?.();
    setSelectedAction(null);
  };

  if (selectedAction) {
    return (
      <ActionValidationCommentForm
        selectedAction={selectedAction}
        setSelectedAction={setSelectedAction}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateLog || isPendingPostComment}
      />
    );
  }

  if (currentLog.completed_at) {
    return (
      <ChangeDecisionChip
        completed={currentLog.manually_confirmed === 1}
        onClick={() =>
          setSelectedAction(
            currentLog.manually_confirmed === 1
              ? ValidationLogAction.FAIL
              : ValidationLogAction.PASS
          )
        }
      />
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1, mt: 4 }}>
      <Button
        data-testid="validation-log-initial-pass"
        onClick={() => setSelectedAction(ValidationLogAction.PASS)}
        variant="outlined"
        startIcon={<VerifyIcon fill="inherit" color="inherit" />}>
        {t("pass")}
      </Button>
      <Button
        data-testid="validation-log-initial-fail"
        onClick={() => setSelectedAction(ValidationLogAction.FAIL)}
        variant="outlined"
        startIcon={<RejectIcon />}>
        {t("fail")}
      </Button>
      <Button variant="outlined"> &#8230;</Button>
    </Box>
  );
}
