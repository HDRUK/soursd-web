"use client";

import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import useFeature from "@/hooks/useFeature";
import { postLogin, postLoginOTP } from "@/services/auth";
import getUser from "@/services/users/getUser";
import { setAuthData } from "@/utils/auth";
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
  const setUserData = useStore(state => state.setUser);
  const [type] = useState("passwordForm");
  const [payload] = useState({
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
    error: loginError,
  } = useMutation(["postLogin"], async (values: LoginFormValues) =>
    postLogin(values, {
      401: {
        message: "loginDetailsIncorrect",
      },
      error: {
        message: "submitError",
      },
    })
  );

  const {
    mutateAsync: mutateUserAsync,
    isError: isUserError,
    isLoading: isUserLoading,
    error: userError,
  } = useMutation(["getUser"], async (id: number) =>
    getUser(id, {
      error: {
        message: "submitError",
      },
    })
  );

  const {
    mutateAsync: mutateLoginOTPAsync,
    isError: isLoginOTPError,
    isLoading: isLoginOTPLoading,
  } = useMutation(["postLoginOTP"], async (values: LoginOTPFormValues) =>
    postLoginOTP({ ...values, ...payload })
  );

  const handleLoginSubmit = useCallback(async (values: LoginFormValues) => {
    const authDetails = await mutateLoginAsync(values);
    const userDetails = await mutateUserAsync(authDetails.data.user.id);

    setUserData(userDetails.data);
    setAuthData(authDetails.data);

    const userGroup = authDetails.data.user.user_group;

    if (userGroup === "ISSUERS") {
      router.push(routes.profileIssuer.path);
    } else if (userGroup === "ORGANISATIONS") {
      router.push(routes.profileOrganisation.path);
    } else {
      router.push(routes.profileResearcher.path);
    }
  }, []);

  const handleLoginOTPSubmit = useCallback(
    (values: LoginOTPFormValues) => {
      mutateLoginOTPAsync({ ...payload, ...values }).then(() => {
        router.push(routes.profileIssuer.path);
      });
    },
    [payload]
  );

  const error = `${(loginError as Error) || (userError as Error)?.message}`;

  return (
    <FormModal
      open
      isDismissable
      onClose={() => router.push(routes.homepage.path)}>
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<HubIcon />}>{t("title")}</FormModalHeader>
        {type === "passwordForm" && (
          <LoginForm
            onSubmit={handleLoginSubmit}
            mutateState={{
              isError: isLoginError || isUserError,
              isLoading: isLoginLoading || isUserLoading,
              error,
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
