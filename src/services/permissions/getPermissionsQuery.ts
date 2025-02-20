import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getPermissions from "./getPermissions";

export default function getPermissionsQuery(options?: QueryOptions) {
  return {
    queryKey: ["getPermissions", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getPermissions({
        error: {
          message: "getPermissionsError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getPermissions>>>;
}
