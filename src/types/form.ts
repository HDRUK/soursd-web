interface QueryState {
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isFetched?: boolean;
  isLoading?: boolean;
  reset?: () => void;
}

interface MutationState {
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isPending?: boolean;
  reset?: () => void;
}

export type { QueryState, MutationState };
