import { QueryOptions } from "../../types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUsers from "./getUsers";

export default function getUsersQuery(options?: QueryOptions) {
  return {
    queryKey: ["getUsers", ...(options?.queryKeySuffix || [])],
    queryFn: () =>
      getUsers(
        {},
        {
          error: {
            message: "getUsersError",
          },
          ...options?.responseOptions,
        }
      ),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUsers>>>;
}
