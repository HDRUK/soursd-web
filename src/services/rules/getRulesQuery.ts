import getRules from "./getRules";

export default function getCustodianRulesQuery() {
  return {
    queryKey: ["getAllRules"],
    queryFn: () =>
      getRules({
        error: {
          message: "getAllRulesError",
        },
      }),
  };
}
