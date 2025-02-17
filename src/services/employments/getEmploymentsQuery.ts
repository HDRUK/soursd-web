import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getEmployments from "./getEmployments";

export default function getEmploymentsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getEmployments", registryId],
    queryFn: ({ queryKey }) =>
      getEmployments(queryKey[1] as number, {
        error: { message: "getEmploymentsError", ...options?.error },
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getEmployments>>;
}
