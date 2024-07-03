import { useEffect, useState } from "react";
import { RefetchQueryFilters, useQueryClient } from "react-query";

type IterationValue = string | undefined;

interface UseQueryRefetchProps<T> {
  delay?: number;
  cancel?(value: T): boolean;
  onComplete?(): void;
  options: RefetchQueryFilters;
}

export default function useQueryRefetch<T>(
  { delay = 2000, cancel, onComplete, options }: UseQueryRefetchProps<T>,
  value: T
) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const handleRefetch = () => setShouldRefetch(true);

  const cancelRefetch = () => setShouldRefetch(false);

  useEffect(() => {
    setIsLoading(true);

    let timeout: NodeJS.Timeout;

    const doQuery = () => {
      timeout = setTimeout(async () => {
        queryClient.refetchQueries(options).then(() => {
          if (cancel?.(value)) {
            clearTimeout(timeout);
            setIsLoading(false);

            onComplete?.();
          } else {
            doQuery();
          }
        });
      }, delay);
    };

    if (shouldRefetch && !cancel?.(value)) {
      doQuery();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [value, shouldRefetch]);

  return {
    refetch: handleRefetch,
    cancel: cancelRefetch,
    isLoading,
  };
}

export type { IterationValue, UseQueryRefetchProps };
