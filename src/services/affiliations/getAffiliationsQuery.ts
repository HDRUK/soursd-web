import { QueryFunctionContext } from "@tanstack/react-query";
import getAffiliations from "./getAffiliations";

type QueryFunctionContextDefault = QueryFunctionContext<[string, number]>;

export default function getAffiliationsQuery(registryId: number) {
  return {
    queryKey: ["getAffiliations", registryId],
    queryFn: ({ queryKey }: QueryFunctionContextDefault) =>
      getAffiliations(queryKey[1], {
        error: { message: "getAffiliationsError" },
      }),
    enabled: !!registryId,
  };
}
