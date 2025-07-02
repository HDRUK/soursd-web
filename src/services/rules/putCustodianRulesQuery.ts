import putCustodianRules, {
  PutCustodianRulesPayload,
} from "./putCustodianRules";

export default function putCustodianRulesQuery(id?: number) {
  return {
    mutationKey: ["putCustodianRules", id],
    mutationFn: (payload: PutCustodianRulesPayload) =>
      putCustodianRules(id as number, payload, {
        error: {
          message: "submitError",
        },
      }),
  };
}
