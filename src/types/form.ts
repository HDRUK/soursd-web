interface QueryState {
  isError: boolean;
  error?: unknown | string | null;
  isSuccess?: boolean;
  isFetched?: boolean;
  isFetching?: boolean;
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

type PropsWithMutation<T> = T & {
  mutateState: MutationState;
};

type PropsWithQuery<T> = T & {
  queryState: QueryState;
};

export type { QueryState, MutationState, PropsWithMutation, PropsWithQuery };
