"use client";

import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import { useTranslations } from "next-intl";
import DetailsForm, { DetailsFormValues } from "../DetailsForm";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/data/store";
import {
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";

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
    mutationKey: ["patchIssuer", organisation?.id],
    mutationFn: (payload: PatchOrganisationPayload) =>
      patchOrganisation(organisation?.id, payload, {
        error: {
          message: "submitError",
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
