"use client";

import {
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";
import { useMutation } from "@tanstack/react-query";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getOrganisationQuery } from "@/services/organisations";
import { useStore } from "@/data/store";

interface UseUpdateOrganisationProps {
  id: string | number | undefined;
  messageSuccess?: boolean;
}

const NAMESPACE_TRANSLATION = "UsePatchOrganisation";
const usePatchOrganisation = ({
  id,
  messageSuccess = true,
}: UseUpdateOrganisationProps) => {
  const [organisation, setOrganisation] = useStore(store => [
    store.getOrganisation(),
    store.setOrganisation,
  ]);

  const t = useTranslations(NAMESPACE_TRANSLATION);
  const mutation = useMutation({
    mutationKey: ["patchOrganisation", id],
    mutationFn: (payload: Partial<PatchOrganisationPayload>) =>
      patchOrganisation(id as number, payload, {
        error: {
          message: "patchOrganisationError",
        },
      }),
  });
  const { refetch: refetchOrganisation } = useQuery(
    getOrganisationQuery(organisation?.id as number, {
      enabled: false,
    })
  );

  const onSubmit = async (fields: Partial<PatchOrganisationPayload>) => {
    const payload = { ...fields };
    await mutation.mutateAsync(payload);
    mutation.isPending = true;

    refetchOrganisation().then(res => {
      if (organisation && setOrganisation) {
        if (res?.data?.data) {
          setOrganisation(res.data.data);
        }
      }
      mutation.isPending = false;
      if (messageSuccess) {
        showAlert("success", {
          text: t("text"),
          confirmButtonText: t("confirmText"),
        });
      }
    });
  };

  return {
    ...mutation,
    onSubmit,
  };
};

export default usePatchOrganisation;
