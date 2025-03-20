import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getActionLogs from "./getActionLogs";

export default function getActionLogsQuery(
  userId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getActionLogs", userId, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getActionLogs(queryKey[1] as number, {
        error: { message: "getActionLogsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getActionLogs>>>;
}
