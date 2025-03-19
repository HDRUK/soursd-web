import patchAffiliation from "./patchAffiliation";
import { PatchAffiliationsPayload } from "./types";

export default function patchAffiliationQuery() {
  return {
    mutationKey: ["patchAffiliation"],
    mutationFn: ({
      affiliationId,
      payload,
    }: {
      affiliationId: number;
      payload: PatchAffiliationsPayload;
    }) => {
      return patchAffiliation(affiliationId, payload, {
        error: { message: "patchAffiliationError" },
      });
    },
  };
}
