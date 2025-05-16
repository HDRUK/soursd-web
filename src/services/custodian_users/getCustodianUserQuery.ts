import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
import getCustodianUser from "./getCustodianUser";

export default function getCustodianUserQuery(
  custodianUserId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getCustodianUser",
      custodianUserId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getCustodianUser(queryKey[1] as number, {
        error: {
          message: "getCustodianUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianUser>>>;
}
