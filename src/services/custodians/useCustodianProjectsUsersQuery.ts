import { capitaliseFirstLetter } from "@/utils/string";
import { SearchDirections } from "../../consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "../../hooks/usePaginatedQuery";
import getCustodianProjectUsers, {
  ProjectEntities,
} from "./getCustodianProjectUsers";

interface GetEntityProjectsQuery<T> extends Partial<PaginatedQueryProps<T>> {
  variant: ProjectEntities;
}

export default function useProjectsUsersQuery<T>(
  id: number,
  { variant, defaultQueryParams, ...restParams }: GetEntityProjectsQuery<T>
) {
  const entityKey = `get${capitaliseFirstLetter(variant)}Projects`;

  return usePaginatedQuery({
    queryKeyBase: [entityKey],
    defaultQueryParams: {
      sort: `title:${SearchDirections.ASC}`,
      ...defaultQueryParams,
    },
    queryFn: queryParams =>
      getCustodianProjectUsers(id, queryParams, {
        error: {
          message: entityKey,
        },
      }),
    ...restParams,
  });
}
