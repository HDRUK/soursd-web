"use client";

import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { LoadingButton } from "@mui/lab";
import { useStore } from "@/data/store";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import {
  postStartVeriffQuery,
  PostStartVeriffPayload,
} from "@/services/veriff";

const NAMESPACE_TRANSLATION = "VeriffTermsAndConditions";

interface StartVeriffFrameButtonProps {
  onStart?: () => void;
  onCancel?: () => void;
  onSuccess?: () => void;
  onOther?: (msg: MESSAGES) => void;
  onClose: () => void;
  disabled: boolean;
}

export default function StartVeriffFrameButton({
  onStart,
  onSuccess,
  onCancel,
  onOther,
  onClose,
  disabled = true,
}: StartVeriffFrameButtonProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const user = useStore(state => state.getUser());

  const { mutateAsync: startIdvtCheck, isPending } = useMutation(
    postStartVeriffQuery()
  );

  const startVerification = async () => {
    const payload = {
      firstName: user?.first_name,
      lastName: user?.last_name,
      idNumber: user?.id,
      vendorData: btoa(user?.registry?.digi_ident as string),
    } as PostStartVeriffPayload;

    await startIdvtCheck(payload).then(data => {
      createVeriffFrame({
        url: data.url,
        onEvent(msg) {
          switch (msg) {
            case MESSAGES.STARTED:
              onStart?.();
              break;
            case MESSAGES.SUBMITTED:
            case MESSAGES.FINISHED:
              onSuccess?.();
              break;
            case MESSAGES.CANCELED:
              onCancel?.();
              break;
            default:
              onOther?.(msg);
          }
          onClose();
        },
      });
    });
  };

  return (
    <LoadingButton
      loading={isPending}
      onClick={startVerification}
      disabled={disabled}>
      {t("startVerificationButton")}
    </LoadingButton>
  );
}
