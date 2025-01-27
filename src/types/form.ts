interface QueryState {
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isFetched?: boolean;
  isLoading?: boolean;
}

interface MutationState {
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isPending?: boolean;
}

export type { QueryState, MutationState };
