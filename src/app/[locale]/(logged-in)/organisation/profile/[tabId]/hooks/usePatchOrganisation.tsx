"use client";

import {
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";
import { Organisation } from "@/types/application";
import { useMutation } from "@tanstack/react-query";
import { showAlert } from "@/utils/showAlert";
import { useTranslations } from "next-intl";

interface UseUpdateOrganisationProps {
  id: string | number | undefined;
  organisation?: Organisation;
  setOrganisation?: (organisation: Organisation | undefined) => void;
  messageSucces?: boolean;
}

const NAMESPACE_TRANSLATION = "UsePatchOrganisation";
const usePatchOrganisation = ({
  id,
  organisation,
  setOrganisation,
  messageSucces = true,
}: UseUpdateOrganisationProps) => {
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

  const onSubmit = async (fields: Partial<PatchOrganisationPayload>) => {
    const payload = { ...fields };
    console.log("hiya", payload);
    return;
    await mutation.mutateAsync(payload).then(res => console.log("hiya", res));
    if (organisation && setOrganisation) {
      setOrganisation({
        ...organisation,
        ...payload,
      } as Organisation);
      if (messageSucces) {
        showAlert("success", {
          text: t("text"),
          confirmButtonText: t("confirmText"),
        });
      }
    }
  };
  return {
    ...mutation,
    onSubmit,
  };
};

export default usePatchOrganisation;
