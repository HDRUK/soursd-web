"use client";

import {
  patchOrganisation,
  PatchOrganisationPayload,
} from "@/services/organisations";
import { Organisation } from "@/types/application";
import { useMutation } from "@tanstack/react-query";

export interface DetailsFormValues {
  organisation_name: string;
  address_1: string;
  address_2: string;
  town: string;
  county: string;
  country: string;
  postcode: string;
  companies_house_no: string;
  sector_id: number;
  charity_registration_id: string;
  ror_id: string;
  website: string;
  smb_status: boolean;
}

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
    mutationFn: (payload: Partial<DetailsFormValues>) =>
      patchOrganisation(id as number, payload, {
        error: {
          message: "patchOrganisationError",
        },
      }),
  });

  const onSubmit = async (fields: Partial<DetailsFormValues>) => {
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
