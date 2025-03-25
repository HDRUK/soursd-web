import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getProjectRoles from "./getProjectRoles";

export default function getProjectRolesQuery(options?: QueryOptions) {
  return {
    queryKey: ["getProjectRoles", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getProjectRoles({
        error: {
          message: "getProjectRolesError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectRoles>>>;
}
