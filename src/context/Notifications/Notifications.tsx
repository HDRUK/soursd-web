"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { MutationKey, QueryKey } from "react-query";

enum NotificationsTypes {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

type NotificationsType = NotificationsTypes;

type NotificationsState = Record<NotificationsType, Record<string, string>>;
interface NotificationsHelpers {
  add: (type: NotificationsType, queryKey: QueryKey, message: string) => void;
  remove: (type: NotificationsType, queryKey: QueryKey) => void;
}

const NotificationContext = createContext<
  NotificationsState & NotificationsHelpers
>({
  [NotificationsTypes.ERROR]: {},
  [NotificationsTypes.SUCCESS]: {},
  [NotificationsTypes.INFO]: {},
  [NotificationsTypes.WARNING]: {},
  add: () => {},
  remove: () => {},
});

const getKey = (queryKey: QueryKey | MutationKey | string) => {
  return Array.isArray(queryKey) ? queryKey.join("") : queryKey.toString();
};

const getTypeByQueryKey = (
  queryKeys: (QueryKey | MutationKey | string)[],
  data: Record<string, string>
) => {
  const validKeys = queryKeys.filter(
    (queryKey: QueryKey) => data[getKey(queryKey)]
  );

  const filteredData: { [key: string]: string } = {};

  validKeys.forEach(validKey => {
    const key = getKey(validKey);

    filteredData[key] = data[key];
  });

  return filteredData;
};

const useNotifications = (queryKeys?: (QueryKey | MutationKey | string)[]) => {
  const { error, success, info, warning, add, remove } =
    useContext(NotificationContext);

  const params = useMemo(
    () => ({
      add,
      remove,
      error: getTypeByQueryKey(queryKeys || [], error),
      success: getTypeByQueryKey(queryKeys || [], success),
      info: getTypeByQueryKey(queryKeys || [], info),
      warning: getTypeByQueryKey(queryKeys || [], warning),
    }),
    [error, success, info, warning, queryKeys]
  );

  return params;
};

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationsProvider = ({ children }: NotificationProviderProps) => {
  const ref = useRef<NotificationsState>({
    error: {},
    success: {},
    warning: {},
    info: {},
  });

  const [notifications, setNotifications] = useState<NotificationsState>(
    ref.current
  );

  const getKey = (queryKey: QueryKey | MutationKey | string) => {
    return Array.isArray(queryKey) ? queryKey.join("") : queryKey.toString();
  };

  const add = (
    type: NotificationsType,
    queryKey: QueryKey | MutationKey,
    message: string
  ) => {
    ref.current = {
      ...ref.current,
      [type]: {
        ...ref.current[type],
        [getKey(queryKey)]: message,
      },
    };

    setNotifications(ref.current);
  };

  const remove = (
    type: NotificationsType,
    queryKey: QueryKey | MutationKey | string
  ) => {
    delete ref.current[type]?.[getKey(queryKey)];

    setNotifications(ref.current);
  };

  const value = useMemo(
    () => ({
      add,
      remove,
      ...notifications,
    }),
    [notifications]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationsProvider, useNotifications, NotificationsTypes };

export type { NotificationsType };
