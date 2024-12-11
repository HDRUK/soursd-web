"use client";

import ApplicationLink from "@/components/ApplicationLink";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { VALIDATION_SCHEMA_KEY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import PageContainer from "@/modules/PageContainer";
import useApplicationDependencies from "@/queries/useApplicationDependencies";
import {
  ApplicationDataState,
  ApplicationSystemConfig,
  User,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
import { showAlert } from "@/utils/showAlert";
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
  me: User;
  value: ApplicationDataState;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";
const NAMESPACE_TRANSLATION_PROFILE = "Profile";

const ApplicationDataProvider = ({
  children,
  me,
  value,
}: ApplicationDataProviderProps) => {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const tProfile = useTranslations(NAMESPACE_TRANSLATION_PROFILE);
  const addUrlToHistory = useStore(store => store.addUrlToHistory);

  const [user, setUser] = useStore(store => [store.config.user, store.setUser]);

  const [organisation, setOrganisation] = useStore(store => [
    store.config.organisation,
    store.setOrganisation,
  ]);

  const [issuer, setIssuer] = useStore(store => [
    store.config.issuer,
    store.setIssuer,
  ]);

  const [sectors, setSectors] = useStore(store => [
    store.config.sectors,
    store.setSectors,
  ]);

  const path = usePathname();

  const {
    isLoading: isApplicationLoading,
    isError: isApplicationError,
    data: applicationData,
  } = useApplicationDependencies({
    user: me,
  });

  const queriedSystemConfig = applicationData["getSystemConfig"];
  const queriedUser = applicationData["getUser"];
  const queriedOrganisation = applicationData["getOrganisation"];
  const queriedIssuer = applicationData["getIssuer"];
  const queriedSectors = applicationData["getSectors"];

  useEffect(() => {
    if (
      !queriedUser?.data.profile_completed_at &&
      queriedUser?.user_group === UserGroup.USERS
    ) {
      showAlert("warning", {
        text: tProfile("profileCompleteWarningMessage"),
      });
    }

    setUser(queriedUser?.data);
  }, [queriedUser?.data]);

  useEffect(() => {
    setOrganisation(queriedOrganisation?.data);
  }, [queriedOrganisation?.data]);

  useEffect(() => {
    setIssuer(queriedIssuer?.data);
  }, [queriedIssuer?.data]);

  useEffect(() => {
    setSectors(queriedSectors?.data?.data);
  }, [queriedSectors?.data?.data]);

  useEffect(() => {
    if (path) addUrlToHistory(path);
  }, [path]);

  const providerValue = useMemo(() => {
    const systemConfig = parseSystemConfig(queriedSystemConfig?.data);

    return {
      ...value,
      systemConfig,
      validationSchema: systemConfig[VALIDATION_SCHEMA_KEY]?.value,
    };
  }, [!!queriedSystemConfig?.data, value]);

  console.log("sectors", sectors);

  const isFinishedLoading =
    user && sectors && organisation && !isApplicationLoading && issuer;

  return (
    <ApplicationDataContext.Provider value={providerValue}>
      {isApplicationError && (
        <PageContainer>
          {isApplicationError && (
            <OverlayCenterAlert>
              {t.rich("getDependenciesError", {
                applicationLink: ApplicationLink,
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
