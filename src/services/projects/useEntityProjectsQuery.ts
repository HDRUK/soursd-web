import { SearchDirections } from "@/consts/search";
import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { capitaliseFirstLetter } from "@/utils/string";
import getEntityProjects, { ProjectEntities } from "./getEntityProjects";

interface GetEntityProjectsQuery<T> extends Partial<PaginatedQueryProps<T>> {
  variant: ProjectEntities;
}

export default function useEntityProjectsQuery<T>(
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
      getEntityProjects(variant, id, queryParams, {
        error: {
          message: entityKey,
        },
      }),
    ...restParams,
  });
}
