import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
import getProjectUsers from "./getUsers";

export default function getProjectUsersWorkflowQuery(
  custodianId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getUsers", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getProjectUsers(custodianId, {
        error: { message: "getUsers" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectUsers>>>;
}
