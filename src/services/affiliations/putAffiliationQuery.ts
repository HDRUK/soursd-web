import putAffiliation from "./putAffiliation";
import { PatchAffiliationsPayload } from "./types";

export default function putAffiliationQuery() {
  return {
    mutationKey: ["putAffiliation"],
    mutationFn: ({
      affiliationId,
      payload,
    }: {
      affiliationId: number;
      payload: PatchAffiliationsPayload;
    }) => {
      return putAffiliation(affiliationId, payload, {
        error: { message: "putAffiliationError" },
      });
    },
  };
}
