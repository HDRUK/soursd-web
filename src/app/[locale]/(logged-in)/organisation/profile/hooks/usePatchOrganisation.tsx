"use client";

import {
  patchOrganisation,
  PatchOrganisationPayload,
  getOrganisationQuery,
} from "@/services/organisations";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";
import { useQuery, useMutation } from "@tanstack/react-query";
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
        403: {
          message: "patchOrganisationForbidden",
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

    await refetchOrganisation().then(res => {
      if (organisation && setOrganisation) {
        if (res?.data?.data) {
          setOrganisation(res.data.data);
        }
      }
    });
    if (messageSuccess) {
      showAlert("success", {
        text: t("text"),
        confirmButtonText: t("confirmText"),
      });
    }
    return Promise.resolve();
  };

  return {
    ...mutation,
    onSubmit,
  };
};

export default usePatchOrganisation;
