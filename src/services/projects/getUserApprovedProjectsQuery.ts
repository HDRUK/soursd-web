import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getUserApprovedProjects from "./getUserApprovedProjects";

export default function getUserApprovedProjectsQuery(
  registryId: number,
  options?: QueryOptions
) {
  return {
    queryKey: ["getUserApprovedProjects", registryId],
    queryFn: ({ queryKey }) =>
      getUserApprovedProjects(queryKey[1] as number, {
        error: { message: "getUserApprovedProjectsError", ...options?.error },
      }),
    ...options,
  } as UseQueryOptions<ReturnType<typeof getUserApprovedProjects>>;
}
