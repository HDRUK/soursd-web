interface QueryState {
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isFetched?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  reset?: () => void;
  status?: string;
}
interface MutationState {
  fetchStatus?: string;
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isPending?: boolean;
  reset?: () => void;
}

type WithMutationState<T> = T & {
  mutateState: MutationState;
};

type WithQueryState<T> = T & {
  queryState: QueryState;
};

export type { QueryState, MutationState, WithQueryState, WithMutationState };
