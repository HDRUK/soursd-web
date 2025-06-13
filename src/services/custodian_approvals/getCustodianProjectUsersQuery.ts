import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getCustodianProjectUsers from "./getCustodianProjectUsers";

export default function getCustodianProjectUsersQuery(
  custodianId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getCustodianProjectUsers", Number(custodianId)],
    queryFn: ({ queryKey }) =>
      getCustodianProjectUsers(queryKey[1] as number, {
        error: {
          message: `${queryKey[0]}Error`,
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getCustodianProjectUsers>>>;
}
