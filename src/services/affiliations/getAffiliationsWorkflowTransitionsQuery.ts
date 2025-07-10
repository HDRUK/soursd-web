import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getAffiliations from "./getAffiliations";
import getAffiliationsWorkflowTransitions from "./getAffiliationsWorkflowTransitions";

export default function getAffiliationsQuery(options?: QueryOptions) {
  return {
    queryKey: [
      "getAffiliationsWorkflowTransitions",
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: () =>
      getAffiliationsWorkflowTransitions({
        error: { message: "getAffiliationsWorkflowTransitionsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getAffiliations>>>;
}
