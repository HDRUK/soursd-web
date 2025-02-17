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
  ResearcherProfessionalRegistration,
  ResearcherProject,
  ResearcherTraining,
  Sector,
  SystemConfig,
  User,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
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
  professionalRegistratonsData: ResearcherProfessionalRegistration[];
  isOrganisation: boolean;
  isCustodian: boolean;
  children: ReactNode;
}

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
  professionalRegistratonsData,
  isOrganisation,
  isCustodian,
  children,
}: ApplicationDataProps) {
  const path = usePathname();

  const {
    addUrlToHistory,
    user,
    setUser,
    organisation,
    setOrganisation,
    custodian,
    setCustodian,
    sectors,
    setSectors,
    permissions,
    setPermissions,
    histories,
    setHistories,
    application,
    setApplication,
  } = useStore(
    ({
      addUrlToHistory,
      getUser,
      setUser,
      getOrganisation,
      setOrganisation,
      getCustodian,
      setCustodian,
      getSectors,
      setSectors,
      getPermissions,
      setPermissions,
      getHistories,
      setHistories,
      getApplication,
      setApplication,
    }) => ({
      addUrlToHistory,
      user: getUser(),
      setUser,
      organisation: getOrganisation(),
      setOrganisation,
      custodian: getCustodian(),
      setCustodian,
      sectors: getSectors(),
      setSectors,
      permissions: getPermissions(),
      setPermissions,
      histories: getHistories(),
      setHistories,
      application: getApplication(),
      setApplication,
    })
  );

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
      professionalRegistrations: professionalRegistratonsData,
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

  return isAllSet && children;
}
