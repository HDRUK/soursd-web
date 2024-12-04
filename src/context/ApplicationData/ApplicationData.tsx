"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { ISSUER_ID, VALIDATION_SCHEMA_KEY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import useMe from "@/hooks/useMe";
import PageContainer from "@/modules/PageContainer";
import { getIssuer } from "@/services/issuers";
import { getOrganisation } from "@/services/organisations";
import { getSystemConfig } from "@/services/system_config";
import { getUser } from "@/services/users";
import {
  ApplicationDataState,
  ApplicationSystemConfig,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
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
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

const ApplicationDataProvider = ({
  children,
  value,
}: ApplicationDataProviderProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const addUrlToHistory = useStore(store => store.addUrlToHistory);
  const me = useMe();
  const [user, setUser] = useStore(store => [store.getUser(), store.setUser]);

  const [organisation, setOrganisation] = useStore(store => [
    store.config.organisation,
    store.setOrganisation,
  ]);
  const [issuer, setIssuer] = useStore(store => [
    store.getIssuer(),
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
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["getUser", me?.id],
    queryFn: ({ queryKey }) =>
      getUser(queryKey[1], {
        error: {
          message: "getUserError",
        },
      }),
    enabled: !!me?.id,
  });

  const {
    data: organisationData,
    isError: isOrganisationError,
    error: organisationError,
  } = useQuery({
    queryKey: ["getOrganisation", me?.organisation_id],
    queryFn: ({ queryKey }) =>
      getOrganisation(queryKey[1], {
        error: {
          message: "getOrganisationError",
        },
      }),
    enabled: !!me?.organisation_id,
  });

  const {
    data: issuerData,
    isError: isIssuerError,
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
    if (userData?.data) {
      setUser(userData.data);
    }
  }, [userData?.data]);

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
    ((me?.id && me) || !me?.id) &&
    ((me?.organisation_id && organisation) || !me?.organisation_id) &&
    !!systemConfigData?.data &&
    issuer &&
    !isUserLoading &&
    user;

  return (
    <ApplicationDataContext.Provider value={providerValue}>
      {isAnyError && (
        <PageContainer>
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

export { ApplicationDataProvider, useApplicationData };

export type { ApplicationSystemConfig };
