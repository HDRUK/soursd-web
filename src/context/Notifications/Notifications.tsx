"use client";

import { useTranslations } from "next-intl";
import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { MutationKey, QueryKey } from "@tanstack/react-query";
import { toast } from "react-toastify";

enum NotificationsTypes {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}

type NotificationsType = NotificationsTypes;

type NotificationsState = Record<NotificationsType, Record<string, string>>;

interface NotificationsOptions {
  immediate?: boolean;
  tKey: string;
}

interface NotificationsHelpers {
  add: (type: NotificationsType, queryKey: QueryKey, message: string) => void;
  remove: (type: NotificationsType, queryKey: QueryKey) => void;
}

interface NotificationProviderProps {
  children: ReactNode;
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

const useNotifications = (
  queryKeys?: (QueryKey | MutationKey | string)[],
  options?: NotificationsOptions
) => {
  const t = useTranslations(options?.tKey);
  const { error, success, info, warning, add, remove } =
    useContext(NotificationContext);

  const filteredError = getTypeByQueryKey(queryKeys || [], error);
  const filteredSuccess = getTypeByQueryKey(queryKeys || [], success);
  const filteredInfo = getTypeByQueryKey(queryKeys || [], info);
  const filteredWarning = getTypeByQueryKey(queryKeys || [], warning);

  const showToastNotifications = (
    messages: Record<string, string>,
    type: NotificationsTypes
  ) => {
    Object.entries(messages).forEach(([queryKey, value]) => {
      toast[type](t(value), {
        toastId: queryKey,
        onClose: () => remove(type, queryKey),
      });
    });
  };

  if (options?.immediate) {
    showToastNotifications(filteredError, NotificationsTypes.ERROR);
    showToastNotifications(filteredSuccess, NotificationsTypes.SUCCESS);
    showToastNotifications(filteredInfo, NotificationsTypes.INFO);
    showToastNotifications(filteredWarning, NotificationsTypes.WARNING);
  }

  const params = useMemo(
    () => ({
      add,
      remove,
      error: filteredError,
      success: filteredSuccess,
      info: filteredInfo,
      warning: filteredWarning,
    }),
    [error, success, info, warning, queryKeys]
  );

  return params;
};

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

export { NotificationsProvider, NotificationsTypes, useNotifications };

export type { NotificationsType };
