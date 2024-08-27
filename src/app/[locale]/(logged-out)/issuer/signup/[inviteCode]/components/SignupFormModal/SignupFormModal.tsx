"use client";

import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { useApplicationData } from "@/context/ApplicationData";
import postRegisterIssuer from "@/services/auth/postRegisterIssuer";
import { PostRegisterIssuerPayload } from "@/services/auth/types";
import { getByInviteCode } from "@/services/issuers";
import { isExpiredInvite } from "@/utils/date";
import HubIcon from "@mui/icons-material/Hub";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    isLoading: isGetIssuerLoading,
    data: issuerData,
    error: issuerError,
  } = useQuery({
    queryKey: ["getByInviteCode", inviteCode || ""],
    queryFn: () =>
      getByInviteCode(inviteCode || "", {
        error: { message: "getByInviteCodeError" },
      }),
    enabled: !!inviteCode,
  });

  const {
    mutateAsync: mutateSignupAsync,
    isError: isSignupError,
    isPending: isSignupLoading,
    error: signupError,
  } = useMutation({
    mutationKey: ["postRegisterIssuer"],
    mutationFn: (payload: PostRegisterIssuerPayload) => {
      return postRegisterIssuer(payload, {
        error: { message: "submitError" },
      });
    },
  });

  const handleSignupSubmit = async (values: SignupFormValues) => {
    const { password } = values;

    if (issuerData) {
      const payload = {
        password,
        first_name: "John",
        last_name: "Smith",
        email: issuerData?.data.contact_email,
      };

      mutateSignupAsync(payload).then(() => {
        router.push(routes.login.path);
      });
    }
  };

  const expired = isExpiredInvite(issuerData?.data.invite_sent_at);

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

  if (issuerError) {
    return (
      <OverlayCenterAlert>
        {tSignup.rich(issuerError, {
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
    <FormModal
      open
      isDismissable
      onClose={() => router.push(routes.homepage.path)}>
      <FormModalHeader icon={<HubIcon />}>
        {t("title")} {issuerData?.data.name}
      </FormModalHeader>
      <SignupForm
        onSubmit={handleSignupSubmit}
        mutateState={{
          isLoading: isSignupLoading,
          isError: isSignupError,
          error: signupError,
        }}
      />
    </FormModal>
  );
}
