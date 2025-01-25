import { MutationState, QueryState } from "@/types/form";

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
  };
}

export {
  getCombinedQueryState,
  getQueriesError,
  isQueriesError,
  isQueriesFetched,
  isQueriesLoading,
};
