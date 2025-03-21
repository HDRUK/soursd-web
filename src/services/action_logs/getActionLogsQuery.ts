import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getActionLogs from "./getActionLogs";

type ActionLogVariant = "user" | "organisation" | "custodian";

export default function getActionLogsQuery(
  id: number,
  entity: ActionLogVariant,
  options?: QueryOptions
) {
  return {
    queryKey: ["getActionLogs", id, entity, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getActionLogs(queryKey[1] as number, queryKey[2] as ActionLogVariant, {
        error: { message: "getActionLogsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getActionLogs>>>;
}
