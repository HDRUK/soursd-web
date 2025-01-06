"use client";

import { useStore } from "@/data/store";
import { mockedPersonalDetailsGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import { useTranslations } from "next-intl";
import usePatchOrganisation from "../../hooks/usePatchOrganisation";
import SubsidiariesForm from "../../components/SubsidiariesForm";

const NAMESPACE_TRANSLATION_PROFILE = "Profile";

export default function Subsidiaries() {
  const { organisation, setOrganisation } = useStore(state => {
    return {
      organisation: state.config.organisation,
      setOrganisation: state.setOrganisation,
    };
  });
  const t = useTranslations(NAMESPACE_TRANSLATION_PROFILE);

  const {
    isError,
    isPending: isLoading,
    error,
    onSubmit,
  } = usePatchOrganisation({
    id: organisation?.id,
    organisation,
    setOrganisation,
  });

  return (
    <PageGuidance title={t("identity")} {...mockedPersonalDetailsGuidanceProps}>
      <SubsidiariesForm
        onSubmit={onSubmit}
        queryState={{
          isError,
          isLoading,
          error,
        }}
      />
    </PageGuidance>
  );
}
