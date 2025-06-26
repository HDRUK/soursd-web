import putCustodianProjectUser from "./putCustodianProjectUser";
import { ChangeValidationStatusPayload } from "./types";

interface MutationArgs {
  params: { projectUserId: number };
  payload: ChangeValidationStatusPayload;
}

export default function putCustodianProjectUserQuery(custodianId: number) {
  return {
    mutationKey: ["putCustodianProjectUser", custodianId],
    mutationFn: async ({ params, payload }: MutationArgs) => {
      const { projectUserId } = params;
      return putCustodianProjectUser(custodianId, projectUserId, payload, {
        error: { message: "putCustodianProjectUserError" },
      });
    },
  };
}
