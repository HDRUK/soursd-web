"use client";

import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { ApplicationDataState } from "@/types/application";
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
  const path = usePathname();

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
