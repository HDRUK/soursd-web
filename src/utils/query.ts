import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

function isQueriesLoading(
  queries: (Partial<UseMutationResult> | Partial<UseQueryResult>)[]
) {
  return queries.some(query => query.isLoading || query.isPending);
}

function isQueriesError(
  queries: (Partial<UseMutationResult> | Partial<UseQueryResult>)[]
) {
  return queries.some(query => query.isError);
}

function isQueriesFetched(
  queries: (Partial<UseMutationResult> | Partial<UseQueryResult>)[]
) {
  return (
    queries.filter(query => query.isFetched || query.isSuccess || query.isError)
      .length === queries.length
  );
}

function getQueriesError(
  queries: (Partial<UseMutationResult> | Partial<UseQueryResult>)[]
) {
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

function getCombinedQueryState(
  queries: Partial<UseMutationResult> | Partial<UseQueryResult>[]
) {
  return {
    isLoading: isQueriesLoading(queries),
    isError: isQueriesError(queries),
    error: getQueriesError(queries),
    isFetched: isQueriesFetched(queries),
  };
}

export {
  isQueriesLoading,
  isQueriesError,
  getQueriesError,
  getCombinedQueryState,
};
