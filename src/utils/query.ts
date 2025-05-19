import { MutationState, QueryState } from "../types/form";
import { SearchParams } from "../types/query";

function isQueriesLoading<T extends MutationState & QueryState>(queries: T[]) {
  return queries.some(query => query.isLoading || query.isPending);
}

function isQueriesError<T extends MutationState & QueryState>(queries: T[]) {
  return queries.some(query => query.isError);
}

function isQueriesFetched<T extends MutationState & QueryState>(queries: T[]) {
  return (
    queries.filter(query => query.isFetched || query.isSuccess || query.isError)
      .length === queries.length
  );
}

function isQueriesSuccess<T extends MutationState & QueryState>(queries: T[]) {
  return queries.filter(query => query.isSuccess).length === queries.length;
}

function getSearchQuerystring(searchParams: SearchParams) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach(item => {
        params.append(`${key}[]`, String(item));
      });
    } else {
      params.append(key, String(value));
    }
  });

  return params ? `?${params.toString()}` : "";
}

function getSearchSortOrder(queryParams: SearchParams) {
  return (
    typeof queryParams?.sort === "string" && queryParams?.sort.split(":")[1]
  );
}

function getQueriesError<T extends MutationState & QueryState>(queries: T[]) {
  let errors: Error[] = [];

  queries.forEach(({ error }) => {
    if (error) {
      if (Array.isArray(error)) {
        errors = errors.concat(error);
      } else {
        errors.push(error);
      }
    }
  });

  return errors.filter(error => {
    return !!error;
  });
}

function getCombinedQueryState<T extends MutationState & QueryState>(
  queries: T[]
) {
  return {
    isLoading: isQueriesLoading(queries),
    isError: isQueriesError(queries),
    error: getQueriesError(queries),
    isFetched: isQueriesFetched(queries),
    isSuccess: isQueriesSuccess(queries),
  };
}

export {
  getCombinedQueryState,
  getQueriesError,
  isQueriesError,
  isQueriesFetched,
  isQueriesLoading,
  isQueriesSuccess,
  getSearchQuerystring,
  getSearchSortOrder,
};
