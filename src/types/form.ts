interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error?: unknown | string | null;
}

export type { LoadingState };
