"use client";

import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { useApplicationData } from "@/context/ApplicationData";
import { postRegister } from "@/services/auth";
import { RegisterPayload } from "@/services/auth/types";
import { getByInviteCode } from "@/services/issuer";
import { isExpiredInvite } from "@/utils/date";
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
    error: issuerError,
  } = useQuery(
    ["getByInviteCode", inviteCode || ""],
    async () =>
      getByInviteCode(inviteCode || "", {
        error: { message: "getIssuerError" },
      }),
    {
      enabled: !!inviteCode,
    }
  );

  const {
    mutateAsync: mutateSignupAsync,
    isError: isSignupError,
    isLoading: isSignupLoading,
    error: signupError,
  } = useMutation(["postRegister"], async (payload: RegisterPayload) => {
    return postRegister(payload, {
      error: { message: "submitError" },
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

  console.log("isGetIssuerError", isGetIssuerError);

  const expired = isExpiredInvite(issuerData?.invite_sent_at);

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
        {tSignup.rich("noVerificationCode", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (inviteCode && issuerData && expired) {
    return (
      <OverlayCenterAlert>
        {tSignup.rich("verificationExpired", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (isGetIssuerError) {
    return (
      <OverlayCenterAlert>
        {tSignup.rich((issuerError as Error)?.message, {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (!isGetIssuerLoading && !issuerData) {
    return (
      <OverlayCenterAlert>
        {tSignup.rich("noData", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  return (
    <FormModal open isDismissable onClose={() => router.replace("homepage")}>
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<HubIcon />}>
          {t("title")} {issuerData?.name}
        </FormModalHeader>
        <SignupForm
          onSubmit={handleSignupSubmit}
          mutateState={{
            isLoading: isSignupLoading,
            isError: isSignupError,
            error: `${(signupError as Error)?.message}`,
          }}
        />
      </Box>
    </FormModal>
  );
}
