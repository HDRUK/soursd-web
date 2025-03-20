import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import { useStore } from "@/data/store";
import getActionLogs from "./getActionLogs";

type ActionLogVariant = "user" | "organisation" | "custodian";

export default function getActionLogsQuery(
  entity: ActionLogVariant,
  options?: QueryOptions
) {
  const { id } = useStore(state => {
    switch (entity) {
      case "user":
        return { id: state.getUser()?.id || 1 };
      case "organisation":
        return { id: state.getOrganisation()?.id || 1 };
      case "custodian":
        return { id: state.getCustodian()?.id || 1 };
      default:
        return { id: 1 };
    }
  });

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
