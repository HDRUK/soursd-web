interface QueryState {
  isLoading: boolean;
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
}

interface MutationState {
  isPending: boolean;
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
}

export type { QueryState, MutationState };
