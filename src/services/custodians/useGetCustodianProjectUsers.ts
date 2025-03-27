import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getCustodianProjectUsers from "./getCustodianProjectUsers";
import { CustodianProjectUsersResponse } from "./types";

interface GetPaginatedCustodianProjectUsersQuery<
  T = CustodianProjectUsersResponse,
> extends Partial<PaginatedQueryProps<T>> {}

export default function useGetPaginatedUsers(
  custodianId: number,
  projectId: number,
  {
    queryKeyBase,
    defaultQueryParams,
    ...restParams
  }: GetPaginatedCustodianProjectUsersQuery = {}
) {
  const queryKey = [
    queryKeyBase || "getCustodianProjectUsers",
    custodianId,
    projectId,
  ];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `email:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianProjectUsers(custodianId, projectId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
