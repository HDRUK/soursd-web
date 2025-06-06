"use client";

import { useState } from "react";
import { createVeriffFrame, MESSAGES } from "@veriff/incontext-sdk";
import { LoadingButton } from "@mui/lab";
import { useStore } from "@/data/store";

interface StartVeriffFrameButtonProps {
  onSuccess: () => void;
  onClose: () => void;
  disabled: boolean;
}

export default function StartVeriffFrameButton({
  onClose,
  disabled = true,
}: StartVeriffFrameButtonProps) {
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
              console.log("Verification started");
              break;
            case MESSAGES.SUBMITTED:
              console.log("Verification submitted");
              break;
            case MESSAGES.FINISHED:
              console.log("Verification finished");
              break;
            case MESSAGES.CANCELED:
              console.log("Verrif cancelled");
              break;
            case MESSAGES.RELOAD_REQUEST:
              console.log("Reload requested");
              break;
            default:
              break;
          }
          onClose();
        },
      });
    } catch (e) {
      console.log(`Verification failed`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      loading={loading}
      onClick={startVerification}
      disabled={disabled}>
      Start Verification
    </LoadingButton>
  );
}
