import { useCallback, useRef, useState } from "react";
import { RefetchQueryFilters, useQueryClient } from "@tanstack/react-query";

interface UseQueryRefetchProps {
  delay?: number;
  options: RefetchQueryFilters;
}

export default function useQueryRefetch({
  delay = 2000,
  options,
}: UseQueryRefetchProps) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const pollInterval = useRef<NodeJS.Timeout>();

  const cancelQueries = useCallback(() => {
    queryClient.cancelQueries(options);
    clearTimeout(pollInterval.current);
  }, []);

  const cancelRefetch = useCallback(() => {
    cancelQueries();
    setIsLoading(false);
  }, []);

  const refetchQueries = async () => {
    return queryClient.refetchQueries(options);
  };

  const handleRefetch = useCallback(() => {
    cancelQueries();
    setIsLoading(true);

    pollInterval.current = setInterval(async () => {
      console.log("Querying", options);
      await refetchQueries();
    }, delay);
  }, []);

  return {
    refetch: handleRefetch,
    cancel: cancelRefetch,
    isLoading,
  };
}

export type { UseQueryRefetchProps };
