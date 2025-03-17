import { User } from "@/types/application";
import PatchAffiliation from "./patchAffiliations";
import { PatchAffiliationsPayload } from "./types";

export default function patchAffiliationQuery(user: User) {
  return {
    mutationKey: ["patchAffiliation", user?.id],
    mutationFn: (payload: PatchAffiliationsPayload) => {
      return PatchAffiliation(user?.registry_id, payload, {
        error: { message: "patchAffiliationError" },
      });
    },
  };
}
