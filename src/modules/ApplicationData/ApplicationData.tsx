"use client";

import { ROUTES } from "@/consts/router";
import { useStore } from "@/data/store";
import { usePathname } from "@/i18n/routing";
import {
  Custodian,
  Organisation,
  Permission,
  ResearcherAccreditation,
  ResearcherAffiliation,
  ResearcherEducation,
  ResearcherEmployment,
  ResearcherProject,
  ResearcherTraining,
  Sector,
  SystemConfig,
  User,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect } from "react";

interface ApplicationDataProps {
  systemConfigData: SystemConfig[];
  userData: User;
  organisationData: Organisation;
  sectorsData: Sector[];
  permissionsData: Permission[];
  custodianData: Custodian;
  accreditationsData: ResearcherAccreditation[];
  educationData: ResearcherEducation[];
  trainingData: ResearcherTraining[];
  employmentsData: ResearcherEmployment[];
  projectsData: ResearcherProject[];
  affiliationData: ResearcherAffiliation[];
  isOrganisation: boolean;
  isCustodian: boolean;
  children: ReactNode;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function ApplicationData({
  systemConfigData,
  userData,
  organisationData,
  sectorsData,
  permissionsData,
  custodianData,
  accreditationsData,
  educationData,
  trainingData,
  employmentsData,
  projectsData,
  affiliationData,
  isOrganisation,
  isCustodian,
  children,
}: ApplicationDataProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

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

  const [application, setApplication] = useStore(store => [
    store.application,
    store.setApplication,
  ]);

  const path = usePathname();

  useEffect(() => {
    const application = parseSystemConfig(systemConfigData);

    setApplication({
      routes: ROUTES,
      system: application,
    });

    setPermissions(permissionsData);
    setSectors(sectorsData);
    setCustodian(custodianData);
    setOrganisation(organisationData);
    setUser(userData);

    setHistories({
      accreditations: accreditationsData,
      education: educationData,
      training: trainingData,
      employments: employmentsData,
      approvedProjects: projectsData,
      affiliations: affiliationData,
    });
  }, []);

  useEffect(() => {
    if (path) addUrlToHistory(path);
  }, [path]);

  const isAllSet =
    application &&
    user &&
    ((isOrganisation && organisation) || !isOrganisation) &&
    ((user.registry_id && histories) || !user.registry_id) &&
    ((custodian && isCustodian) || !isCustodian) &&
    !!sectors?.length &&
    !!permissions?.length;

  return <>{isAllSet && children}</>;
}
