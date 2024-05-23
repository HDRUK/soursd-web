"use client";

import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { CONTACT_MAIL_ADDRESS } from "@/config/contacts";
import { useApplicationData } from "@/context/ApplicationData";
import { postRegister } from "@/services/auth";
import { RegisterPayload } from "@/services/auth/types";
import { getByInviteCode } from "@/services/issuer";
import { isExpired } from "@/utils/date";
import HubIcon from "@mui/icons-material/Hub";
import { Box, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import SignupForm, { SignupFormValues } from "../SignupForm";

const NAMESPACE_TRANSLATION_SIGNUP_ISSUER = "SignupFormIssuer";
const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ inviteCode: string }>();
  const inviteCode = params?.inviteCode;
  const t = useTranslations(NAMESPACE_TRANSLATION_SIGNUP_ISSUER);
  const tSignup = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const { routes } = useApplicationData();

  const {
    isError: isGetIssuerError,
    isLoading: isGetIssuerLoading,
    data: issuerData,
  } = useQuery(
    ["getByInviteCode", inviteCode || ""],
    async () =>
      getByInviteCode(inviteCode || "", {
        error: { message: t("getIssuerError") },
      }),
    {
      enabled: !!inviteCode,
    }
  );

  const {
    mutateAsync: mutateSignupAsync,
    isError: isSignupError,
    isLoading: isSignupLoading,
  } = useMutation(["postRegister"], async (payload: RegisterPayload) => {
    return postRegister(payload, {
      error: { message: tSignup("submitError") },
    });
  });

  const handleSignupSubmit = async (values: SignupFormValues) => {
    const { password } = values;

    if (issuerData) {
      const payload = {
        password,
        first_name: "",
        last_name: "",
        email: issuerData.contact_email,
      };

      mutateSignupAsync(payload).then(() => {
        router.push(routes.login.path);
      });
    }
  };

  const expired = isExpired(issuerData?.verificationExpiry || "");

  if (isGetIssuerLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  if (!inviteCode) {
    return (
      <OverlayCenterAlert>
        {t("noVerificationCode")}{" "}
        <a href={`mailto:${CONTACT_MAIL_ADDRESS}`}>{CONTACT_MAIL_ADDRESS}</a>
      </OverlayCenterAlert>
    );
  }

  if (inviteCode && issuerData && expired) {
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

  if (!isGetIssuerLoading && !issuerData) {
    return <OverlayCenterAlert>{t("noData")}</OverlayCenterAlert>;
  }

  return (
    <FormModal open isDismissable onClose={() => router.replace("homepage")}>
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<HubIcon />}>
          {tSignup("title")} {issuerData?.name}
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
