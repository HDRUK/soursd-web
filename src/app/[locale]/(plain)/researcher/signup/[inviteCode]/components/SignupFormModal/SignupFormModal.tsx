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
import PersonIcon from "@mui/icons-material/Person";
import { Box, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import SignupForm, { SignupFormValues } from "../SignupForm";

const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";
const NAMESPACE_TRANSLATION_SIGNUP_RESEARCHER = "SignupFormResearcher";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ inviteCode: string }>();
  const inviteCode = params?.inviteCode;
  const t = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const tResearcher = useTranslations(NAMESPACE_TRANSLATION_SIGNUP_RESEARCHER);
  const { routes } = useApplicationData();

  const {
    isError: isGetResearcherError,
    isLoading: isGetResearcherLoading,
    data: researcherData,
    error: researcherError,
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
    const { firstName: first_name, lastName: last_name, password } = values;

    if (researcherData) {
      const payload = {
        password,
        first_name,
        last_name,
        email: researcherData.contact_email,
      };

      mutateSignupAsync(payload).then(() => {
        router.push(routes.login.path);
      });
    }
  };

  const expired = isExpiredInvite(researcherData?.invite_sent_at);

  if (isGetResearcherLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  if (!inviteCode) {
    return (
      <OverlayCenterAlert>
        {t.rich("noVerificationCode", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (inviteCode && researcherData && expired) {
    return (
      <OverlayCenterAlert>
        {t.rich("verificationExpired", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (isGetResearcherError) {
    return (
      <OverlayCenterAlert>
        {t.rich((researcherError as Error)?.message, {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (!isGetResearcherLoading && !researcherData) {
    return (
      <OverlayCenterAlert>
        {t.rich("noData", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  return (
    <FormModal open isDismissable onClose={() => router.replace("homepage")}>
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<PersonIcon />}>
          {tResearcher("title")} {researcherData?.name}
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
