"use client";

import FormModal from "@/components/FormModal";
import FormModalHeader from "@/components/FormModalHeader";
import { useApplicationData } from "@/context/ApplicationData";
import { postRegisterOrganisation } from "@/services/auth";
import { PostRegisterOrganisationPayload } from "@/services/auth/types";
import BusinessIcon from "@mui/icons-material/Business";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import SignupFormContacts, {
  SignupFormContactsValues,
} from "../SignupFormContacts";
import SignupFormDetails, {
  SignupFormDetailsValues,
} from "../SignupFormDetails";
import SignupFormOtherDetails, {
  SignupFormOtherDetailsValues,
} from "../SignupFormOtherDetails";

const NAMESPACE_TRANSLATION_SIGNUP_ORGANISATION = "SignupFormOrganisation";

enum SignupFormPanels {
  DETAILS = "details",
  OTHER_DETAILS = "other_details",
  CONTACTS = "contacts",
}

export default function Page() {
  const router = useRouter();
  const tOrganisation = useTranslations(
    NAMESPACE_TRANSLATION_SIGNUP_ORGANISATION
  );
  const { routes } = useApplicationData();
  const [formDetailsValues, setFormDetailsValues] =
    useState<SignupFormDetailsValues>({
      organisation_name: "",
      lead_applicant_email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
      tscs: false,
      companies_house_no: "",
    });
  const [formContactsValues, setFormContactsValues] =
    useState<SignupFormContactsValues>({
      dpo_name: "",
      dpo_email: "",
      hr_name: "",
      hr_email: "",
    });
  const [formOtherDetailsValues, setFormOtherDetailsValues] =
    useState<SignupFormOtherDetailsValues>({
      address_1: "",
      address_2: "",
      town: "",
      county: "",
      country: "United Kingdom",
      postcode: "",
      dsptk_ods_code: "",
      iso_27001_certified: false,
      ce_certified: false,
      ce_certification_num: "",
    });
  const [activeForm, setActiveForm] = useState<SignupFormPanels>(
    SignupFormPanels.DETAILS
  );

  const {
    mutateAsync: mutateSignupAsync,
    isError: isSignupError,
    isPending: isSignupLoading,
    error: signupError,
  } = useMutation({
    mutationKey: ["postRegisterOrgnisation"],
    mutationFn: (payload: PostRegisterOrganisationPayload) => {
      return postRegisterOrganisation(payload, {
        error: { message: "submitError" },
      });
    },
  });

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
      ...formOtherDetailsValues,
      ...values,
      email: formDetailsValues.lead_applicant_email,
      lead_applicant_organisation_name: `${formDetailsValues.first_name} ${formDetailsValues.last_name}`,
      ce_certification_num: formOtherDetailsValues.ce_certification_num || "",
    };

    mutateSignupAsync(payload).then(() => {
      router.push(routes.login.path);
    });
  };

  return (
    <FormModal
      open
      isDismissable
      onClose={() => router.push(routes.homepage.path)}>
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
          mutateState={{
            isError: isSignupError,
            isLoading: isSignupLoading,
            error: signupError,
          }}
        />
      )}
    </FormModal>
  );
}
