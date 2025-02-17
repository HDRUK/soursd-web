import getOrganisations from "./getOrganisations";

import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { OrganisationsResponse } from "./types";
import { SearchParams } from "@/types/query";

interface GetEntityOrganisationsQuery<T = OrganisationsResponse>
  extends Partial<PaginatedQueryProps<T>> {}

export default function getOrganisationsQuery({
  queryKeyBase,
  defaultQueryParams,
  ...restParams
}: GetEntityOrganisationsQuery = {}) {
  const queryKey = [queryKeyBase || "getOrganisations"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `organisation_name:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getOrganisations(queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
