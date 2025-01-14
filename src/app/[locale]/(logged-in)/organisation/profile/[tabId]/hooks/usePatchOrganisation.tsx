"use client";

import {
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";
import { Organisation } from "@/types/application";
import { useMutation } from "@tanstack/react-query";

interface UseUpdateOrganisationProps {
  id: string | number | undefined;
  organisation?: Organisation;
  setOrganisation?: (organisation: Organisation | undefined) => void;
}

const usePatchOrganisation = ({
  id,
  organisation,
  setOrganisation,
}: UseUpdateOrganisationProps) => {
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
    await mutation.mutateAsync(payload);
    if (organisation && setOrganisation) {
      setOrganisation({
        ...organisation,
        ...payload,
      } as Organisation);
    }
  };
  return {
    ...mutation,
    onSubmit,
  };
};

export default usePatchOrganisation;
