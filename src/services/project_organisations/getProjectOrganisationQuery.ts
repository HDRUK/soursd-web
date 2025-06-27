import { QueryOptions } from "@/types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getProjectOrganisation from "./getProjectOrganisation";

export default function getProjectOrganisationQuery(
  id: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getProjectOrganisation",
      id,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getProjectOrganisation(queryKey[1] as number, {
        error: {
          message: "getProjectOrganisationError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getProjectOrganisation>>>;
}
