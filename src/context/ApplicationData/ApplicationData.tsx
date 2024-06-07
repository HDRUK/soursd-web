"use client";

import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import getUser from "@/services/users/getUser";
import { ApplicationDataState } from "@/types/application";
import { getAuthData } from "@/utils/auth";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect } from "react";

const ApplicationDataContext = createContext({
  routes: ROUTES,
});

const useApplicationData = () => useContext(ApplicationDataContext);

interface ApplicationDataProviderProps {
  children: ReactNode;
  value: ApplicationDataState;
}

const ApplicationDataProvider = ({
  children,
  value,
}: ApplicationDataProviderProps) => {
  const addUrlToHistory = useStore(store => store.addUrlToHistory);
  const setUser = useStore(store => store.setUser);
  const path = usePathname();

  useEffect(() => {
    const initUserFetch = async () => {
      const authDetails = await getAuthData();

      if (authDetails?.user?.id) {
        const userDetails = await getUser(authDetails.user.id, {});

        setUser(userDetails.data);
      }
    };

    initUserFetch();
  }, []);

  useEffect(() => {
    if (path) addUrlToHistory(path);
  }, [path]);

  return (
    <ApplicationDataContext.Provider value={value}>
      {children}
    </ApplicationDataContext.Provider>
  );
};

export { ApplicationDataProvider, useApplicationData };
