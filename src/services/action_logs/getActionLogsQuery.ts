import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
import { ActionLogEntity } from "../../types/logs";
import getActionLogs from "./getActionLogs";

export default function getActionLogsQuery(
  id: number,
  entity: ActionLogEntity,
  options?: QueryOptions
) {
  return {
    queryKey: ["getActionLogs", id, entity, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getActionLogs(queryKey[1] as number, queryKey[2] as ActionLogEntity, {
        error: { message: "getActionLogsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getActionLogs>>>;
}
