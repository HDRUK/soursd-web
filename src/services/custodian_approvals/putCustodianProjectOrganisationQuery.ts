import putCustodianProjectOrganisation from "./putCustodianProjectOrganisation";
import { ChangeValidationStatusPayload } from "./types";

interface MutationArgs {
  params: { projectOrganisationId: number };
  payload: ChangeValidationStatusPayload;
}

export default function putCustodianProjectUserQuery(custodianId: number) {
  return {
    mutationKey: ["putCustodianProjectUserQuery", custodianId],
    mutationFn: async ({ params, payload }: MutationArgs) => {
      const { projectOrganisationId } = params;
      return putCustodianProjectOrganisation(
        custodianId,
        projectOrganisationId,
        payload,
        {
          error: { message: "putCustodianProjectUserError" },
        }
      );
    },
  };
}
