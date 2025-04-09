import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import getCustodiansUserProjects from "./getCustodiansUserProjects";
import { GetCustodiansUserProjectsResponse } from "./types";
import { omit } from "@/utils/json";

type GetCustodiansUserProjectsQuery = Partial<
  PaginatedQueryProps<GetCustodiansUserProjectsResponse>
>;

export default function usePaginatedCustodiansUserProjects(
  custodianId: number,
  userId: number,
  options?: GetCustodiansUserProjectsQuery
) {
  const queryKey = [options?.queryKeyBase || "getUsers"];

  return usePaginatedQuery({
    queryKeyBase: [queryKey, custodianId, userId],
    defaultQueryParams: {
      sort: `title:${SearchDirections.ASC}`,
      ...options?.defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodiansUserProjects(custodianId, userId, queryParams, {
        error: {
          message: `${queryKey}Error`,
        },
      }),
    ...omit(options, ["defaultQueryParams", "queryKeyBase"]),
  });
}
