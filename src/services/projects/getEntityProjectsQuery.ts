"use client";

import usePaginatedQuery, {
  PaginatedQueryProps,
} from "@/hooks/usePaginatedQuery";
import { SearchParams } from "@/types/query";
import { capitaliseFirstLetter } from "@/utils/string";
import getEntityProjects, { ProjectEntities } from "./getEntityProjects";
import { ProjectsResponse } from "./types";

interface GetEntityProjectsQuery<T> extends Partial<PaginatedQueryProps<T>> {
  variant: ProjectEntities;
}

export default function getEntityProjectsQuery<T>(
  id: number,
  { variant, ...restParams }: GetEntityProjectsQuery<T>
) {
  const entityKey = `get${capitaliseFirstLetter(variant)}Projects`;

  return usePaginatedQuery({
    queryKeyBase: [entityKey],
    queryFn: (queryParams: SearchParams) => {
      return getEntityProjects(variant, id, queryParams, {
        error: {
          message: entityKey,
        },
      });
    },
    ...restParams,
  });
}
