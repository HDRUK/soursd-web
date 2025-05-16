import { QueryOptions } from "../../types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUserApprovedProjects from "./getUserApprovedProjects";

export default function getUserApprovedProjectsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getUserApprovedProjects",
      registryId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getUserApprovedProjects(queryKey[1] as number, {
        error: { message: "getUserApprovedProjectsError" },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getUserApprovedProjects>>>;
}
