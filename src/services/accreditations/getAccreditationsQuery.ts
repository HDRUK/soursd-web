import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getAccreditations from "./getAccreditations";

export default function getAccreditationsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getAccreditations", registryId],
    queryFn: ({ queryKey }) =>
      getAccreditations(queryKey[1] as number, {
        error: { message: "getAccreditationsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getAccreditations>>;
}
