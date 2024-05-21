"use client";

import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { useApplicationData } from "@/context/ApplicationData";
import { getIssuerByVerificationCode } from "@/services/endpoint";
import { postCreateUser } from "@/services/keycloak";
import { isExpired } from "@/utils/date";
import HubIcon from "@mui/icons-material/Hub";
import { Box, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import SignupForm, { SignupFormValues } from "../SignupForm";

const NAMESPACE_TRANSLATION_SIGNUP_ISSUER = "SignupFormIssuer";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const verificationCode = params?.get("verificationCode");
  const t = useTranslations(NAMESPACE_TRANSLATION_SIGNUP_ISSUER);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const { routes } = useApplicationData();

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
    mutateAsync: mutateSignupAsync,
    isError: isSignupError,
    isLoading: isSignupLoading,
  } = useMutation(["postCreateUser"], async (values: SignupFormValues) =>
    postCreateUser({
      ...values,
      email: "",
    })
  );

  const handleSignupSubmit = async (values: SignupFormValues) => {
    mutateSignupAsync(values).then(() => {
      router.push(routes.login.path);
    });
  };

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
      <OverlayCenterAlert>
        {t("noVerificationCode")}{" "}
        <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
      </OverlayCenterAlert>
    );
  }

  if (verificationCode && data && expired) {
    return (
      <OverlayCenterAlert>
        {t("verificationExpired")}
        <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
      </OverlayCenterAlert>
    );
  }

  if (isGetIssuerError) {
    return (
      <OverlayCenterAlert>
        {t("getIssuerError")}
        <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
      </OverlayCenterAlert>
    );
  }

  if (!isGetIssuerLoading && !data) {
    return <OverlayCenterAlert>{t("noData")}</OverlayCenterAlert>;
  }

  return (
    <FormModal open isDismissable onClose={() => router.replace("homepage")}>
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<HubIcon />}>
          {tSignup("title")} {data?.name}
        </FormModalHeader>
        <SignupForm
          onSubmit={handleSignupSubmit}
          mutateState={{
            isLoading: isSignupLoading,
            isError: isSignupError,
          }}
        />
      </Box>
    </FormModal>
  );
}
