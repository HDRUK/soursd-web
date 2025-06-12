import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getUsers from "./getUsers";
import { ProjectUsersResponse } from "./types";

interface GetPaginatedCustodianUsersQuery<T = ProjectUsersResponse>
  extends Partial<PaginatedQueryProps<T>> {}

export default function usePaginatedGetProjectUsers(
  custodianId: number,
  {
    queryKeyBase,
    defaultQueryParams,
    ...restParams
  }: GetPaginatedCustodianUsersQuery = {}
) {
  const queryKey = [queryKeyBase || "getUsers", custodianId];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `email:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getUsers(custodianId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
