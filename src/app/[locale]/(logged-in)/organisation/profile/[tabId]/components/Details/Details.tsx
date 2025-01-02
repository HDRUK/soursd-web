"use client";

import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import {
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import DetailsForm, { DetailsFormValues } from "../DetailsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Details() {
  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const {
    mutateAsync: mutateUpdateAsync,
    isError,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["patchOrganisation", organisation?.id],
    mutationFn: (payload: PatchOrganisationPayload) =>
      patchOrganisation(organisation?.id, payload, {
        error: {
          message: "patchUserError",
        },
      }),
  });

  const handleSubmit = async (fields: DetailsFormValues) => {
    const payload = { ...organisation, ...fields };

    await mutateUpdateAsync(payload);

    setOrganisation(payload);
  };

  return (
    <PageGuidance title={t("identity")} {...mockedPersonalDetailsGuidanceProps}>
      <DetailsForm
        onSubmit={handleSubmit}
        queryState={{
          isError,
          isLoading,
          error,
        }}
      />
    </PageGuidance>
  );
}
