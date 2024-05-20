"use client";

import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import { useApplicationData } from "@/context/ApplicationData";
import useFeature from "@/hooks/useFeature";
import { postLogin, postLoginOTP } from "@/services/login";
import HubIcon from "@mui/icons-material/Hub";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";
import LoginForm from "../LoginForm";
import { LoginFormValues } from "../LoginForm/LoginForm";
import LoginOTPForm, { LoginOTPFormValues } from "../LoginOTPForm";

const NAMESPACE_TRANSLATION_LOGIN = "LoginForm";

export default function LoginFormModal() {
  const router = useRouter();
  const [type, setType] = useState("passwordForm");
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const { routes } = useApplicationData();
  const t = useTranslations(NAMESPACE_TRANSLATION_LOGIN);
  const { enabled: otpEnabled } = useFeature("LoginOtp");

  const {
    mutateAsync: mutateLoginAsync,
    isError: isLoginError,
    isLoading: isLoginLoading,
  } = useMutation(["postLogin"], async (values: LoginFormValues) =>
    postLogin(values)
  );

  const {
    mutateAsync: mutateLoginOTPAsync,
    isError: isLoginOTPError,
    isLoading: isLoginOTPLoading,
  } = useMutation(["postLoginOTP"], async (values: LoginOTPFormValues) =>
    postLoginOTP({ ...values, ...payload })
  );

  const handleLoginSubmit = (values: LoginFormValues) => {
    mutateLoginAsync(values).then(() => {
      if (otpEnabled) {
        setType("otpForm");
        setPayload({
          ...values,
          otp: "",
        });
      } else {
        router.push(routes.profileIssuer.path);
      }
    });
  };

  const handleLoginOTPSubmit = useCallback(
    async (values: LoginOTPFormValues) => {
      mutateLoginOTPAsync({ ...payload, ...values }).then(() => {
        router.push(routes.profileIssuer.path);
      });
    },
    [payload]
  );

  return (
    <FormModal open isDismissable onClose={() => router.replace("homepage")}>
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<HubIcon />}>{t("title")}</FormModalHeader>
        {type === "passwordForm" && (
          <LoginForm
            onSubmit={handleLoginSubmit}
            mutateState={{
              isError: isLoginError,
              isLoading: isLoginLoading,
            }}
          />
        )}
        {type === "otpForm" && otpEnabled && (
          <LoginOTPForm
            onSubmit={handleLoginOTPSubmit}
            onClickResend={() => {}}
            mutateState={{
              isError: isLoginOTPError,
              isLoading: isLoginOTPLoading,
            }}
          />
        )}
      </Box>
    </FormModal>
  );
}
