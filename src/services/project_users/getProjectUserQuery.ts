import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getProjectUser from "./getProjectUser";

export default function getProjectUserQuery(
  id: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getProjectUser", id, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getProjectUser(queryKey[1] as number, {
        error: {
          message: "getProjectUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectUser>>>;
}
