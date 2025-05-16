import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
import getCustodianWebhooks from "./getCustodianWebhooks";

export default function getCustodianWebhooksQuery(
  custodianId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianWebhooks",
      custodianId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianWebhooks(queryKey[1] as number, {
        error: {
          message: "getCustodianWebhooksError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianWebhooks>>>;
}
