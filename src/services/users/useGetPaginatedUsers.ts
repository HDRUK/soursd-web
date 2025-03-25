import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getUsers from "./getUsers";
import { UsersResponse } from "./types";

interface GetPaginatedUsersQuery<T = UsersResponse>
  extends Partial<PaginatedQueryProps<T>> {}

export default function useGetPaginatedUsers({
  queryKeyBase,
  defaultQueryParams,
  ...restParams
}: GetPaginatedUsersQuery = {}) {
  const queryKey = [queryKeyBase || "getUsers"];

  return usePaginatedQuery({
    queryKeyBase: queryKey,
    defaultQueryParams: {
      sort: `email:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getUsers(queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...restParams,
  });
}
