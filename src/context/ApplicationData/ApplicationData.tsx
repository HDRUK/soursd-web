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
import {
  ApplicationDataState,
  ApplicationSystemConfig,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
import { getAuthData, updateAuthUser } from "@/utils/auth";
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
import { useMutation, useQuery } from "react-query";

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
  const setAuth = useStore(store => store.setAuth);
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

  const {
    data: userData,
    mutateAsync: mutateUserAsync,
    isError: isUserError,
    isLoading: isUserLoading,
    error: userError,
  } = useMutation(["getUser"], async (id: number) =>
    getUser(id, {
      error: {
        message: "submitError",
      },
    })
  );

  const isLoggedOutPage =
    path?.includes(ROUTES.login.path) ||
    path?.includes(ROUTES.signup.path) ||
    path?.includes(ROUTES.signupOrganistion.path) ||
    path?.includes(ROUTES.signupIssuer.path);

  useEffect(() => {
    const initUserFetch = async () => {
      const authDetails = await getAuthData();

      if (authDetails?.user?.id) {
        const user = await mutateUserAsync(authDetails.user.id);

        setAuth({
          ...authDetails,
          user: {
            ...authDetails.user,
            ...user.data,
          },
        });
      }
    };

    if (!isLoggedOutPage) initUserFetch();
  }, [isLoggedOutPage]);

  useEffect(() => {
    if (path) addUrlToHistory(path);
  }, [path]);

  const systemConfig: Record<string, any> = useMemo(
    () => parseSystemConfig(systemConfigData?.data),
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
          {(isLoading || isUserLoading) && (
            <OverlayCenter>
              <CircularProgress sx={{ color: "#fff" }} />
            </OverlayCenter>
          )}
          {(isError || isUserError) && (
            <OverlayCenterAlert>
              {t.rich(error || userError, {
                contactLink: ContactLink,
              })}
            </OverlayCenterAlert>
          )}
        </DecoratorPanel>
      )}

      {!isLoading &&
        systemConfigData?.data &&
        (isLoggedOutPage || userData?.data) &&
        children}
    </ApplicationDataContext.Provider>
  );
};

export { ApplicationDataProvider, useApplicationData };

export type { ApplicationSystemConfig };
