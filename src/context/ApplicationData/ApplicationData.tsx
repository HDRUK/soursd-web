"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { VALIDATION_SCHEMA_KEY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import DecoratorPanel from "@/modules/DecoratorPanel";
import { getSystemConfig } from "@/services/system_config";
import { getUser } from "@/services/users";
import { ApplicationDataState } from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
import { getAuthData } from "@/utils/auth";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useQuery } from "react-query";

type ApplicationSystemConfig = Record<string, any>;

const ApplicationDataContext = createContext({
  routes: ROUTES,
  systemConfig: {} as ApplicationSystemConfig,
  validationSchema: {} as ApplicationSystemConfig,
});

const useApplicationData = () => useContext(ApplicationDataContext);

interface ApplicationDataProviderProps {
  children: ReactNode;
  value: ApplicationDataState;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

const ApplicationDataProvider = ({
  children,
  value,
}: ApplicationDataProviderProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const addUrlToHistory = useStore(store => store.addUrlToHistory);
  const setUser = useStore(store => store.setUser);
  const path = usePathname();

  const {
    data: systemConfigData,
    isLoading,
    isError,
    error,
  } = useQuery(["getSystemConfig"], () =>
    getSystemConfig({
      error: {
        message: "getSystemConfigError",
      },
    })
  );

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

  const systemConfig: Record<string, any> = useMemo(
    () => parseSystemConfig(systemConfig?.data),
    [!!systemConfigData?.data]
  );

  return (
    <ApplicationDataContext.Provider
      value={{
        ...value,
        systemConfig,
        validationSchema: systemConfig[VALIDATION_SCHEMA_KEY]?.value,
      }}>
      {(isError || isLoading) && (
        <DecoratorPanel>
          {isLoading && (
            <OverlayCenter>
              <CircularProgress sx={{ color: "#fff" }} />
            </OverlayCenter>
          )}
          {isError && (
            <OverlayCenterAlert>
              {t.rich("getSystemConfigError", {
                contactLink: ContactLink,
              })}
            </OverlayCenterAlert>
          )}
        </DecoratorPanel>
      )}

      {!isLoading && systemConfigData?.data && children}
    </ApplicationDataContext.Provider>
  );
};

export { ApplicationDataProvider, useApplicationData };

export type { ApplicationSystemConfig };
