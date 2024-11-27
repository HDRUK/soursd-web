"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenter from "@/components/OverlayCenter";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { ISSUER_ID, VALIDATION_SCHEMA_KEY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import PageContainer from "@/modules/PageContainer";
import { getIssuer } from "@/services/issuers";
import { getOrganisation } from "@/services/organisations";
import { getSystemConfig } from "@/services/system_config";
import { getUser } from "@/services/users";
import {
  ApplicationDataState,
  ApplicationSystemConfig,
  Auth,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
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

interface ApplicationDataProviderQueriesProps
  extends ApplicationDataProviderProps {
  auth?: Auth;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

const ApplicationDataProviderQueries = ({
  prefetchAuth,
  children,
  value,
  auth,
}: ApplicationDataProviderQueriesProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const addUrlToHistory = useStore(store => store.addUrlToHistory);
  const [user, setAuth] = useStore(store => [
    store.config.auth?.user,
    store.setAuth,
  ]);
  const [organisation, setOrganisation] = useStore(store => [
    store.config.organisation,
    store.setOrganisation,
  ]);
  const [issuer, setIssuer] = useStore(store => [
    store.config.issuer,
    store.setIssuer,
  ]);

  const path = usePathname();

  const {
    data: systemConfigData,
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
    data: userData,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["getUser", 8],
    queryFn: ({ queryKey }) =>
      getUser(queryKey[1], {
        error: {
          message: "getUserError",
        },
      }),
    // enabled: !!auth?.user?.id,
  });

  const {
    data: organisationData,
    isError: isOrganisationError,
    error: organisationError,
  } = useQuery({
    queryKey: ["getOrganisation", auth?.user?.organisation_id],
    queryFn: ({ queryKey }) =>
      getOrganisation(queryKey[1], {
        error: {
          message: "getOrganisationError",
        },
      }),
    enabled: !!auth?.user?.organisation_id,
  });

  const {
    data: issuerData,
    isError: isIssuerError,
    isLoading: isIssuerLoading,
    error: issuerError,
  } = useQuery({
    queryKey: ["getIssuer", ISSUER_ID],
    queryFn: ({ queryKey }) =>
      getIssuer(queryKey[1], {
        error: {
          message: "getIssuerError",
        },
      }),
    enabled: !!ISSUER_ID,
  });

  useEffect(() => {
    if (userData?.data && auth) {
      setAuth({
        ...auth,
        user: {
          ...auth?.user,
          ...userData.data,
        },
      });
    }
  }, [auth, userData?.data]);

  useEffect(() => {
    setOrganisation(organisationData?.data);
  }, [organisationData?.data]);

  useEffect(() => {
    setIssuer(issuerData?.data);
  }, [issuerData?.data]);

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

  const isAnyError =
    isError || isUserError || isOrganisationError || isIssuerError;
  const errorMessage = error || userError || organisationError || issuerError;

  const isFinishedLoading =
    ((auth?.user.id && user) || !auth?.user.id) &&
    ((auth?.user.organisation_id && organisation) ||
      !auth?.user.organisation_id) &&
    !!systemConfigData?.data &&
    !isIssuerLoading;

  return (
    <ApplicationDataContext.Provider value={providerValue}>
      {(!isFinishedLoading || isAnyError) && (
        <PageContainer>
          {!isFinishedLoading && (
            <OverlayCenter>
              <CircularProgress />
            </OverlayCenter>
          )}
          {isAnyError && (
            <OverlayCenterAlert>
              {t.rich(errorMessage, {
                contactLink: ContactLink,
              })}
            </OverlayCenterAlert>
          )}
        </PageContainer>
      )}
      {isFinishedLoading && children}
    </ApplicationDataContext.Provider>
  );
};

export { ApplicationDataProviderQueries, useApplicationData };

export type { ApplicationSystemConfig };
