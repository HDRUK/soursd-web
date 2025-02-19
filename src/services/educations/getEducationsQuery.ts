import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getEducations from "./getEducations";

export default function getEducationsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getEducations", registryId],
    queryFn: ({ queryKey }) =>
      getEducations(queryKey[1] as number, {
        error: { message: "getEducationsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getEducations>>;
}
