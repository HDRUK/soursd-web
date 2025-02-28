import patchCustodian from "./patchCustodian";
import { PatchCustodianPayload } from "./types";

export default function patchCustodianRulesQuery(id?: number) {
  return {
    mutationKey: ["patchCustodian", id],
    mutationFn: (payload: PatchCustodianPayload) =>
      patchCustodian(id, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
