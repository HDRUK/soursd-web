import { UseQueryOptions } from "@tanstack/react-query";
import { QueryOptions } from "../../types/requests";
import getProjectUsersWorkflow from "./getProjectUsersWorkflow";

export default function getProjectUsersWorkflowQuery(options?: QueryOptions) {
  return {
    queryKey: ["getProjectUsersWorkflow", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getProjectUsersWorkflow({
        error: { message: "getProjectUsersWorkflow" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectUsersWorkflow>>>;
}
