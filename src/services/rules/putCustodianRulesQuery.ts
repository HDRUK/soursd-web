import patchCustodianRules, {
  PatchCustodianRulesPayload,
} from "./patchCustodianRules";

export default function patchCustodianRulesQuery(id?: number) {
  return {
    mutationKey: ["patchCustodianRules", id],
    mutationFn: (payload: PatchCustodianRulesPayload) =>
      patchCustodianRules(id as number, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
