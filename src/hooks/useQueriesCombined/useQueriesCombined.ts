import { UseQueryOptions, useQueries } from "@tanstack/react-query";

interface CombinedResults<T = unknown> {
  isLoading: boolean;
  isError: boolean;
  error: (Error | null)[];
  data: T;
}

export default function useQueriesCombined<T>(queries: UseQueryOptions[]) {
  return useQueries({
    queries,
    combine: results => {
      const isError = results.some(result => result.isError);
      const isLoading = results.some(result => result.isLoading);
      const error = results.map(result => result.error);

      const data = results
        .map(result => result)
        .reduce((accumulator, currentValue, index) => {
          return {
            ...accumulator,
            [(queries[index].queryKey as string[])[0]]: currentValue.data,
          };
        }, {}) as Record<string, unknown>;

      return {
        isLoading,
        isError,
        error,
        data,
      } as CombinedResults<T>;
    },
  });
}
