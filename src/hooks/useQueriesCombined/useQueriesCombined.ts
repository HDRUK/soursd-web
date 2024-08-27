import { UseQueryOptions, useQueries } from "@tanstack/react-query";

interface CombinedResults<T = unknown> {
  isLoading: boolean;
  isError: boolean;
  error: Record<string, Error | null>;
  data: T;
}

export default function useQueriesCombined<T>(queries: UseQueryOptions[]) {
  return useQueries({
    queries,
    combine: results => {
      const isError = results.some(result => result.isError);
      const isLoading = results.some(result => result.isLoading);

      const error: Record<string, Error | null> = {};
      const data: Record<string, unknown> = {};

      results
        .map(result => result)
        .forEach((result, index) => {
          const queryKey = (queries[index].queryKey as string[])[0];

          error[queryKey] = result.error;
          data[queryKey] = result.data;
        });

      return {
        isLoading,
        isError,
        error,
        data,
      } as CombinedResults<T>;
    },
  });
}
