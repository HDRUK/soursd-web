"use client";

import { useState } from "react";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { LoadingButton } from "@mui/lab";
import { useStore } from "@/data/store";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";

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
  const [loading, setLoading] = useState(false);

  const startVerification = async () => {
    setLoading(true);

    try {
      // server side call
      const res = await fetch("/api/veriff/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user?.first_name,
          lastName: user?.last_name,
          idNumber: user?.id,
          vendorData: btoa(user?.registry?.digi_ident as string),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Verification failed");

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
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      showAlert("error", {
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={loading}
      onClick={startVerification}
      disabled={disabled}>
      {t("startVerificationButton")}
    </LoadingButton>
  );
}
