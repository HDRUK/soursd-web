import { QueryOptions } from "../../types/requests";
import { UseQueryOptions } from "@tanstack/react-query";
import getOrganisation from "./getOrganisation";

export default function getOrganisationQuery(
  organisationId: number,
  options?: QueryOptions
) {
  return {
    queryKey: [
      "getOrganisation",
      organisationId,
      ...(options?.queryKeySuffix || []),
    ],
    queryFn: ({ queryKey }) =>
      getOrganisation(queryKey[1] as number, {
        error: {
          message: "getOrganisationError",
        },
        ...options?.responseOptions,
      }),
    ...options,
  } as UseQueryOptions<Awaited<ReturnType<typeof getOrganisation>>>;
}
