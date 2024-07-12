"use client";

import ContactLink from "@/components/ContactLink";
import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { useApplicationData } from "@/context/ApplicationData";
import { RegisterPayload } from "@/services/auth/types";
import {
  getByInviteCode,
  postRegisterOrganisation,
} from "@/services/organisations";
import { isExpiredInvite } from "@/utils/date";
import BusinessIcon from "@mui/icons-material/Business";
import { Box, CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import SignupFormContacts, {
  SignupFormContactsValues,
} from "../SignupFormContacts";
import SignupFormDetails, {
  SignupFormDetailsValues,
} from "../SignupFormDetails";
import SignupFormOtherDetails, {
  SignupFormOtherDetailsValues,
} from "../SignupFormOtherDetails";

const NAMESPACE_TRANSLATION_SIGNUP = "SignupForm";
const NAMESPACE_TRANSLATION_SIGNUP_ORGANISATION = "SignupFormOrganisation";

enum SignupFormPanels {
  DETAILS = "details",
  OTHER_DETAILS = "other_details",
  CONTACTS = "contacts",
}

export default function Page() {
  const router = useRouter();
  const params = useParams<{ inviteCode: string }>();
  const inviteCode = params?.inviteCode;
  const t = useTranslations(NAMESPACE_TRANSLATION_SIGNUP);
  const tOrganisation = useTranslations(
    NAMESPACE_TRANSLATION_SIGNUP_ORGANISATION
  );
  const { routes } = useApplicationData();
  const [formDetailsValues, setFormDetailsValues] =
    useState<SignupFormDetailsValues>();
  const [formContactsValues, setFormContactsValues] =
    useState<SignupFormContactsValues>();
  const [formOtherDetailsValues, setFormOtherDetailsValues] =
    useState<SignupFormOtherDetailsValues>();
  const [activeForm, setActiveForm] = useState<SignupFormPanels>(
    SignupFormPanels.DETAILS
  );

  const {
    isError: isGetOrganisationError,
    isLoading: isGetOrganisationLoading,
    data: organisationData,
    error: organisationError,
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
    mutateAsync: mutateSignupAsync,
    isError: isSignupError,
    isLoading: isSignupLoading,
    error: signupError,
  } = useMutation(
    ["postRegisterOrgnisation"],
    async (payload: RegisterPayload) => {
      return postRegisterOrganisation(payload, {
        error: { message: "submitError" },
      });
    }
  );

  const handleSignupFormDetailsSubmit = (values: SignupFormDetailsValues) => {
    setActiveForm(SignupFormPanels.OTHER_DETAILS);
    setFormDetailsValues(values);
  };

  const handleSignupFormOtherDetailsPrevious = (
    values: SignupFormOtherDetailsValues
  ) => {
    setActiveForm(SignupFormPanels.DETAILS);
    setFormOtherDetailsValues(values);
  };

  const handleSignupFormOtherDetailsSubmit = (
    values: SignupFormOtherDetailsValues
  ) => {
    setActiveForm(SignupFormPanels.CONTACTS);
    setFormOtherDetailsValues(values);
  };

  const handleSignupFormContactsPrevious = (
    values: SignupFormContactsValues
  ) => {
    setActiveForm(SignupFormPanels.OTHER_DETAILS);
    setFormContactsValues(values);
  };

  const handleSignupFormContactsSubmit = (values: SignupFormContactsValues) => {
    setFormContactsValues(values);

    const payload = {
      ...formDetailsValues,
      ...formContactsValues,
      ...values,
    };

    mutateSignupAsync(payload).then(() => {
      router.push(routes.login.path);
    });
  };

  const expired = isExpiredInvite(organisationData?.data.invite_sent_at);

  if (isGetOrganisationLoading) {
    return (
      <OverlayCenter sx={{ color: "#fff" }}>
        <CircularProgress color="inherit" />
      </OverlayCenter>
    );
  }

  if (inviteCode && organisationData && expired) {
    return (
      <OverlayCenterAlert>
        {t.rich("verificationExpired", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (isGetOrganisationError) {
    return (
      <OverlayCenterAlert>
        {tOrganisation.rich(organisationError, {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    );
  }

  if (inviteCode && !isGetOrganisationLoading && !organisationData) {
    return (
      <OverlayCenterAlert>
        {t.rich("noDataVerification", {
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
        <FormModalHeader icon={<BusinessIcon />}>
          {activeForm === SignupFormPanels.DETAILS &&
            tOrganisation("titleDetails")}
          {activeForm === SignupFormPanels.OTHER_DETAILS &&
            tOrganisation("titleOtherDetails")}
          {activeForm === SignupFormPanels.CONTACTS &&
            tOrganisation("titleContacts")}
        </FormModalHeader>
        {activeForm === SignupFormPanels.DETAILS && (
          <SignupFormDetails
            defaultValues={formDetailsValues}
            defaultEmail={organisationData?.data.contact_email}
            onSubmit={handleSignupFormDetailsSubmit}
          />
        )}
        {activeForm === SignupFormPanels.OTHER_DETAILS && (
          <SignupFormOtherDetails
            defaultValues={formOtherDetailsValues}
            onSubmit={handleSignupFormOtherDetailsSubmit}
            onPrevious={handleSignupFormOtherDetailsPrevious}
          />
        )}
        {activeForm === SignupFormPanels.CONTACTS && (
          <SignupFormContacts
            defaultValues={formContactsValues}
            onSubmit={handleSignupFormContactsSubmit}
            onPrevious={handleSignupFormContactsPrevious}
          />
        )}
      </Box>
    </FormModal>
  );
}
