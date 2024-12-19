"use client";

import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import {
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";
import { useTranslations } from "next-intl";
import usePatchOrganisation from "../../hooks/usePatchOrganisation";
import DetailsForm, { DetailsFormValues } from "../DetailsForm";

const NAMESPACE_TRANSLATION_PROFILE = "Subsidiaries";

export default function Subsidiaries() {
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
  } = usePatchOrganisation(organisation?.id);

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
