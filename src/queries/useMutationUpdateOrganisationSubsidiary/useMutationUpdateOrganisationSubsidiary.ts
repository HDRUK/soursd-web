import { useMutation } from "@tanstack/react-query";
import {
  UpdateOrganisationSubsidiary,
  postOrganisationSubsidiary,
  putOrganisationSubsidiary,
} from "../../services/organisations";

interface MutationArgs {
  payload: UpdateOrganisationSubsidiary;
  params: { subsidiaryId?: number; organisationId: number };
}

export default function useMutationUpdateOrganisationSubsidiary() {
  return useMutation({
    mutationKey: ["updateOrganisationSubsidiary"],
    mutationFn: (requestData: MutationArgs) => {
      const {
        payload,
        params: { subsidiaryId, organisationId },
      } = requestData;

      if (!subsidiaryId) {
        return postOrganisationSubsidiary(organisationId, payload, {
          error: { message: "createOrganisationSubsidiaryError" },
        });
      }

      return putOrganisationSubsidiary(organisationId, subsidiaryId, payload, {
        error: { message: "updateOrganisationSubsidiaryError" },
      });
    },
  });
}
