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
  ResearcherProfessionalRegistration,
  ResearcherProject,
  ResearcherTraining,
  Sector,
  SystemConfig,
  User,
} from "@/types/application";
import { parseSystemConfig } from "@/utils/application";
import { useRouter } from "next/navigation";
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
  projectsData,
  affiliationData,
  professionalRegistratonsData,
  isOrganisation,
  isCustodian,
  children,
}: ApplicationDataProps) {
  const path = usePathname();
  const router = useRouter();

  const useStoreValues = useStore(state => ({
    addUrlToHistory: state.addUrlToHistory,
    user: state.getUser(),
    setUser: state.setUser,
    organisation: state.getOrganisation(),
    setOrganisation: state.setOrganisation,
    custodian: state.getCustodian(),
    setCustodian: state.setCustodian,
    sectors: state.getSectors(),
    setSectors: state.setSectors,
    permissions: state.getPermissions(),
    setPermissions: state.setPermissions,
    histories: state.getHistories(),
    setHistories: state.setHistories,
    application: state.getApplication(),
    setApplication: state.setApplication,
  }));

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
  } = useStoreValues;

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
      employments: [],
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
