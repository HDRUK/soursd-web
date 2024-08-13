"use client";

import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import { Message } from "@/components/Message";
import { UserGroup } from "@/consts/user";
import { useApplicationData } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { postLogin } from "@/services/auth";
import theme from "@/theme";
import { setAuthData } from "@/utils/auth";
import HubIcon from "@mui/icons-material/Hub";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useMutation } from "react-query";
import LoginForm from "../LoginForm";
import { LoginFormValues } from "../LoginForm/LoginForm";

const NAMESPACE_TRANSLATION_LOGIN = "LoginForm";

export default function LoginFormModal() {
  const router = useRouter();
  const { routes } = useApplicationData();
  const getPreviousUrl = useStore(state => state.getPreviousUrl);
  const t = useTranslations(NAMESPACE_TRANSLATION_LOGIN);

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

  const handleLoginSubmit = useCallback(async (values: LoginFormValues) => {
    const authResponse = await mutateLoginAsync(values);

    setAuthData(authResponse?.data);

    const userGroup = authResponse.data.user.user_group;

    if (userGroup === UserGroup.RESEARCHERS) {
      router.push(routes.profileResearcherDetails.path);
    } else if (userGroup === UserGroup.ORGANISATIONS) {
      router.push(routes.profileOrganisation.path);
    } else if (userGroup === UserGroup.ADMINS) {
      router.push(routes.admin.path);
    } else {
      router.push(routes.profileIssuer.path);
    }
  }, []);

  const error = loginError;
  const previousUrl = getPreviousUrl();

  const isFromRegister = [
    routes.signup.path,
    routes.signupIssuer.path,
    routes.signupOrganistion.path,
  ].find(url => previousUrl?.includes(url || ""));

  return (
    <FormModal
      open
      isDismissable
      onClose={() => router.push(routes.homepage.path)}>
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<HubIcon />}>{t("title")}</FormModalHeader>
        {isFromRegister && (
          <Message
            severity="success"
            sx={{
              mb: 3,
              width: "auto",
              [theme.breakpoints.up("md")]: {
                width: "350px",
              },
            }}>
            {t("successfulRegister")}
          </Message>
        )}
        <LoginForm
          onSubmit={handleLoginSubmit}
          mutateState={{
            isError: isLoginError,
            isLoading: isLoginLoading,
            error,
          }}
        />
      </Box>
    </FormModal>
  );
}
