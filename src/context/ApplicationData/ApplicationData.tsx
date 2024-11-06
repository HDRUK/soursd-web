"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { VALIDATION_SCHEMA_KEY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import { mockedOrganisation } from "@/mocks/data/organisation";
import DecoratorPanel from "@/modules/DecoratorPanel";
import { getOrganisation } from "@/services/organisations";
import { getSystemConfig } from "@/services/system_config";
import { getUser } from "@/services/users";
import {
  ApplicationDataState,
  ApplicationSystemConfig,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
import { getAuthData } from "@/utils/auth";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ApplicationDataContext = createContext({
  routes: ROUTES,
  systemConfig: {} as ApplicationSystemConfig,
  validationSchema: {} as ApplicationSystemConfig,
});

const useApplicationData = () => useContext(ApplicationDataContext);

interface ApplicationDataProviderProps {
  children: ReactNode;
  value: ApplicationDataState;
  prefetchAuth?: boolean;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

const ApplicationDataProvider = ({
  prefetchAuth,
  children,
  value,
}: ApplicationDataProviderProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const addUrlToHistory = useStore(store => store.addUrlToHistory);
  const setAuth = useStore(store => store.setAuth);
  const setOrganisation = useStore(store => store.setOrganisation);
  const [authFetched, setAuthFetched] = useState(!prefetchAuth);

  const path = usePathname();

  const {
    data: systemConfigData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getSystemConfig"],
    queryFn: () =>
      getSystemConfig({
        error: {
          message: "getSystemConfigError",
        },
      }),
  });

  const {
    mutateAsync: mutateUserAsync,
    isError: isUserError,
    isPending: isUserLoading,
    error: userError,
  } = useMutation({
    mutationKey: ["getUser"],
    mutationFn: (id: number) =>
      getUser(id, {
        error: {
          message: "getUserError",
        },
      }),
  });

  const {
    mutateAsync: mutateOrganisationAsync,
    isError: isOrganisationError,
    isLoading: isOrganisationLoading,
    error: organisationError,
  } = useMutation({
    mutationKey: ["getOrganisation"],
    mutationFn: (id: number) =>
      getOrganisation(id, {
        error: {
          message: "getOrganisationError",
        },
      }),
  });

  useEffect(() => {
    const initUserFetch = async () => {
      const authDetails = await getAuthData();

      if (prefetchAuth && authDetails?.user?.id) {
        const user = await mutateUserAsync(authDetails.user.id);

        setAuth({
          ...authDetails,
          user: {
            ...authDetails.user,
            ...user.data,
          },
        });

        if (user.data?.organisation_id) {
          const { data } = await mutateOrganisationAsync(
            user.data?.organisation_id
          );

          setOrganisation(data);
        }
      }

      setAuthFetched(true);
    };

    initUserFetch();
  }, []);

  useEffect(() => {
    if (path) addUrlToHistory(path);
  }, [path]);

  const providerValue = useMemo(() => {
    const systemConfig = parseSystemConfig(systemConfigData?.data);

    return {
      ...value,
      systemConfig,
      validationSchema: systemConfig[VALIDATION_SCHEMA_KEY]?.value,
    };
  }, [!!systemConfigData?.data, value]);

  const isAnyLoading = isUserLoading || isLoading || isOrganisationLoading;
  const isAnyError = isError || isUserError || isOrganisationError;
  const errorMessage = error || userError || organisationError;

  const isFinishedLoading =
    !isAnyLoading && !isAnyError && systemConfigData?.data && authFetched;

  return (
    <ApplicationDataContext.Provider value={providerValue}>
      {(isAnyLoading || isAnyError) && (
        <DecoratorPanel>
          {isAnyLoading && (
            <OverlayCenter>
              <CircularProgress sx={{ color: "#fff" }} />
            </OverlayCenter>
          )}
          {isAnyError && (
            <OverlayCenterAlert>
              {t.rich(errorMessage, {
                contactLink: ContactLink,
              })}
            </OverlayCenterAlert>
          )}
        </DecoratorPanel>
      )}

      {isFinishedLoading && children}
    </ApplicationDataContext.Provider>
  );
};

export { ApplicationDataProvider, useApplicationData };

export type { ApplicationSystemConfig };
