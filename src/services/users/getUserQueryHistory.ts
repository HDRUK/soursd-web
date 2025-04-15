import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUserHistory from "./getUserHistory";

export default function getUserHistoryQuery(
  userId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getUser", userId, ...(options?.queryKeySuffix || [])],
    queryFn: ({ queryKey }) =>
      getUserHistory(queryKey[1] as number, {
        error: {
          message: "getUserError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUserHistory>>>;
}
