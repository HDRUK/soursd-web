import { getCombinedQueryState } from "@/utils/query";
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
      const error: Record<string, Error | null> = {};
      const data: Record<string, unknown> = {};

      results
        .map(result => result)
        .forEach((result, index) => {
          const queryKey = (queries[index].queryKey as string[])[0];

          error[queryKey] = result.error;
          data[queryKey] = result.data;

          console.log(queryKey);
          console.log(result);
          console.log(result.isPaused);
          console.log(result.isPending);
          console.log(result.status);
          console.log("============");
        });

      return {
        ...getCombinedQueryState(results),
        error,
        data,
      } as CombinedResults<T>;
    },
  });
}
