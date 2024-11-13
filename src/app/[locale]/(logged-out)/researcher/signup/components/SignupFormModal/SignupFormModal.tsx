"use client";

import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { useApplicationData } from "@/context/ApplicationData";
import { getByInviteCode } from "@/services/users";
import { isExpiredInvite } from "@/utils/date";
import PersonIcon from "@mui/icons-material/Person";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useMutationRegister } from "../../hooks";
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
  } = useMutationRegister(researcherData?.data);

  const handleSignupSubmit = async (values: SignupFormValues) => {
    const { email, password, first_name, last_name } = values;

    mutateSignupAsync({ email, password, first_name, last_name }).then(() => {
      router.push(routes.login.path);
    });
  };

  const expired = isExpiredInvite(researcherData?.data.invite_sent_at);

  if (isGetResearcherLoading) {
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

  if (inviteCode && !isGetResearcherLoading && !researcherData) {
    return (
      <OverlayCenterAlert>
        {t.rich("noDataVerification", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  const names = researcherData?.data.name.split(" ");

  return (
    <FormModal
      open
      isDismissable
      onClose={() => router.push(routes.homepage.path)}>
      <FormModalHeader icon={<PersonIcon />}>
        {tResearcher("title")}
      </FormModalHeader>
      <SignupForm
        defaultFirstname={names?.[0]}
        defaultLastname={names?.[1]}
        defaultEmail={researcherData?.data.contact_email}
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
