"use client";

import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { useApplicationData } from "@/context/ApplicationData";
import postRegisterResearcher from "@/services/auth/postRegisterResearcher";
import { PostRegisterResearcherPayload } from "@/services/auth/types";
import { getOrganisations } from "@/services/organisations";
import { getByInviteCode } from "@/services/users";
import { isExpiredInvite } from "@/utils/date";
import PersonIcon from "@mui/icons-material/Person";
import { Box, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "react-query";
import SignupForm, { SignupFormValues } from "../SignupForm";
import { useMutationRegister } from "../../hooks";

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
        error: { message: "getByInviteCodeError" },
      }),
    {
      enabled: !!inviteCode,
    }
  );

  const {
    isError: isGetOrganisationsError,
    isLoading: isGetOrganisationsLoading,
    data: organisationsData,
    error: organisationsError,
  } = useQuery(
    ["getOrganisationsError"],
    async () =>
      getOrganisations({
        error: { message: "noData" },
      }),
    {
      enabled: !inviteCode,
    }
  );

  const {
    mutateAsync: mutateSignupAsync,
    isError: isSignupError,
    isLoading: isSignupLoading,
    error: signupError,
  } = useMutationRegister(researcherData?.data);

  const handleSignupSubmit = async (values: SignupFormValues) => {
    const {
      firstName: first_name,
      lastName: last_name,
      password,
      email,
      organisation,
      consentScrape,
    } = values;

    const payload = {
      password,
      first_name,
      last_name,
      consent_scrape: consentScrape,
      email,
      organisation_id: parseInt(organisation, 10),
    };

    mutateSignupAsync(payload).then(() => {
      router.push(routes.login.path);
    });
  };

  const expired = isExpiredInvite(researcherData?.data.invite_sent_at);

  if (isGetResearcherLoading || isGetOrganisationsLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
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
        {tResearcher.rich(researcherError, {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (isGetOrganisationsError) {
    return (
      <OverlayCenterAlert>
        {tResearcher.rich(organisationsError, {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (inviteCode && !isGetResearcherLoading && !researcherData) {
    return (
      <OverlayCenterAlert>
        {t.rich("noDataVerification", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (!inviteCode && !isGetOrganisationsLoading && !organisationsData) {
    return (
      <OverlayCenterAlert>
        {tResearcher.rich("noData", {
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
      <Box sx={{ minWidth: "250px" }}>
        <FormModalHeader icon={<PersonIcon />}>
          {tResearcher("title")}
        </FormModalHeader>
        <SignupForm
          defaultEmail={researcherData?.data.contact_email}
          defaultOrganisation={researcherData?.data.organisation_id?.toString()}
          organisations={organisationsData?.data.data || []}
          onSubmit={handleSignupSubmit}
          mutateState={{
            isLoading: isSignupLoading,
            isError: isSignupError,
            error: signupError,
          }}
        />
      </Box>
    </FormModal>
  );
}
