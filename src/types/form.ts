interface QueryState {
  isLoading: boolean;
  isError: boolean;
  error?: unknown | string | null;
}

export type { QueryState };
