"use client";

import FormModal from "@/components/FormModal";
import OverlayCenter from "@/components/OverlayCenter";
import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { useApplicationData } from "@/context/ApplicationData";
import {
  getIssuerByVerificationCode,
  postIssuerSignup,
} from "@/services/endpoint";
import { isExpired } from "@/utils/date";
import { Alert, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import SignupForm, { SignupFormValues } from "../SignupForm";

const NAMESPACE_TRANSLATION = "SignupFormIssuer";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const verificationCode = params?.get("verificationCode");
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const { routes } = useApplicationData();

  const OVERLAY_MAX_WIDTH = "350px";

  const {
    isError: isGetIssuerError,
    isLoading: isGetIssuerLoading,
    data,
  } = useQuery(
    ["getIssuerByVerificationCode", verificationCode || ""],
    async () => getIssuerByVerificationCode(verificationCode || ""),
    {
      enabled: !!verificationCode,
    }
  );

  const {
    mutate,
    isError: isUpdateError,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
  } = useMutation(
    ["postIssuerSignup"],
    async ({ password }: SignupFormValues) => postIssuerSignup({ password })
  );

  const handleSubmit = useCallback((values: SignupFormValues) => {
    mutate(values);
  }, []);

  useEffect(() => {
    if (isUpdateSuccess) {
      redirect(routes.profileIssuer.path);
    }
  }, [isUpdateSuccess]);

  const expired = isExpired(data?.verificationExpiry || "");

  if (isGetIssuerLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  if (!verificationCode) {
    return (
      <OverlayCenter sx={{ maxWidth: OVERLAY_MAX_WIDTH }}>
        <Alert color="error">
          {t("noVerificationCode")}{" "}
          <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
        </Alert>
      </OverlayCenter>
    );
  }

  if (verificationCode && data && expired) {
    return (
      <OverlayCenter sx={{ maxWidth: OVERLAY_MAX_WIDTH }}>
        <Alert color="error">
          {t("verificationExpired")}
          <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
        </Alert>
      </OverlayCenter>
    );
  }

  if (isGetIssuerError) {
    return (
      <OverlayCenter sx={{ maxWidth: OVERLAY_MAX_WIDTH }}>
        <Alert color="error" sx={{ maxWidth: OVERLAY_MAX_WIDTH }}>
          {t("getIssuerError")}
          <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
        </Alert>
      </OverlayCenter>
    );
  }

  if (!isGetIssuerLoading && !data) {
    return (
      <OverlayCenter sx={{ maxWidth: OVERLAY_MAX_WIDTH }}>
        <Alert color="error">
          {t("noData")}
          <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
        </Alert>
      </OverlayCenter>
    );
  }

  return (
    <FormModal open onClose={() => router.replace("homepage")} isDismissable>
      <SignupForm
        onSubmit={handleSubmit}
        data={data}
        mutateState={{
          isUpdateError,
          isUpdateLoading,
        }}
      />
    </FormModal>
  );
}
