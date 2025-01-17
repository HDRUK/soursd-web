"use client";

import ContactLink from "@/components/ContactLink";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import { VALIDATION_SCHEMA_KEY } from "@/consts/application";
import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import PageContainer from "@/modules/PageContainer";
import useApplicationDependencies from "@/queries/useApplicationDependencies";
import useQueriesHistories from "@/queries/useQueriesHistories";
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
  me?: User;
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

  const [custodian, setCustodian] = useStore(store => [
    store.config.custodian,
    store.setCustodian,
  ]);

  const [sectors, setSectors] = useStore(store => [
    store.config.sectors,
    store.setSectors,
  ]);

  const [permissions, setPermissions] = useStore(store => [
    store.config.permissions,
    store.setPermissions,
  ]);

  const [histories, setHistories] = useStore(store => [
    store.config.histories,
    store.setHistories,
  ]);

  const path = usePathname();

  const {
    isLoading: isApplicationLoading,
    isError: isApplicationError,
    data: applicationData,
  } = useApplicationDependencies({
    user: me,
  });

  const {
    isLoading: isHistoriesLoading,
    isError: isHistoriesError,
    data: historiesData,
  } = useQueriesHistories(user?.registry_id as number, !!user?.registry_id);

  const {
    getSystemConfig: systemConfigData,
    getUser: userData,
    getOrganisation: organisationData,
    getSectors: sectorsData,
    getPermissions: permissionsData,
    getCustodian: custodianData,
  } = applicationData;

  useEffect(() => {
    if (
      !userData?.data.profile_completed_at &&
      userData?.data?.user_group === UserGroup.USERS
    ) {
      showAlert("warning", {
        text: tProfile("profileCompleteWarningMessage"),
      });
    }

    setUser(userData?.data);
  }, [userData?.data]);

  useEffect(() => {
    setOrganisation(organisationData?.data);
  }, [organisationData?.data]);

  useEffect(() => {
    setCustodian(custodianData?.data);
  }, [custodianData?.data]);

  useEffect(() => {
    setSectors(sectorsData?.data?.data);
  }, [sectorsData?.data?.data]);

  useEffect(() => {
    setPermissions(permissionsData?.data?.data);
  }, [permissionsData?.data?.data]);

  useEffect(() => {
    const {
      getAccreditations,
      getEducations,
      getTrainings,
      getEmployments,
      getUserApprovedProjects,
    } = historiesData;

    setHistories({
      accreditations: getAccreditations?.data?.data,
      education: getEducations?.data,
      training: getTrainings?.data,
      employments: getEmployments?.data,
      approvedProjects: getUserApprovedProjects?.data,
    });
  }, [historiesData]);

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

  const isFinishedLoading =
    user &&
    //organisation &&
    histories &&
    !isApplicationLoading &&
    !isHistoriesLoading &&
    custodian &&
    !!sectors?.length &&
    !!permissions?.length;

  return (
    <ApplicationDataContext.Provider value={providerValue}>
      {(isApplicationError || isHistoriesError) && (
        <PageContainer>
          <OverlayCenterAlert>
            {t.rich("getDependenciesError", {
              contactLink: ContactLink,
            })}
          </OverlayCenterAlert>
        </PageContainer>
      )}
      {!!isFinishedLoading && children}
    </ApplicationDataContext.Provider>
  );
};

export { ApplicationDataProvider, useApplicationData };

export type { ApplicationSystemConfig };
