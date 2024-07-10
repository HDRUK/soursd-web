"use client";

import { NotificationsTypes, useNotifications } from "@/context/Notifications";
import { ReactNode, useState } from "react";
import {
  Mutation,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";

interface ReactQueryClientProviderProps {
  children: ReactNode;
}

export default function ReactQueryClientProvider({
  children,
}: ReactQueryClientProviderProps) {
  const { add, remove } = useNotifications();

  const queryCache = new QueryCache({
    onError: (message, { queryKey }) => {
      add(NotificationsTypes.ERROR, queryKey, `${message}`);
    },
    onSuccess: (_, { queryKey }) => {
      remove(NotificationsTypes.ERROR, queryKey);
    },
  });

  const mutationCache = new MutationCache({
    onError: (
      error,
      _x,
      _y,
      { options: { mutationKey } }: Mutation<unknown, unknown, unknown, unknown>
    ) => {
      if (mutationKey) add(NotificationsTypes.ERROR, mutationKey, `${error}`);
    },
    onSuccess: (
      _x,
      _y,
      _z,
      { options: { mutationKey } }: Mutation<unknown, unknown, unknown, unknown>
    ) => {
      if (mutationKey) remove(NotificationsTypes.ERROR, mutationKey);
    },
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache,
        mutationCache,
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
