import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getPermissions from "./getPermissions";

export default function getPermissionsQuery(options?: QueryOptions) {
  return {
    queryKey: ["getPermissions"],
    queryFn: () =>
      getPermissions({
        error: {
          message: "getPermissionsError",
          ...options?.error,
        },
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getPermissions>>;
}
