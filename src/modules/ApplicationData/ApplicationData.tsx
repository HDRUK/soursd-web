"use client";

import { useStore } from "@/data/store";
import { usePathname } from "@/i18n/routing";
import { ReactNode, useEffect } from "react";
import { ROUTES } from "../../consts/router";
import {
  Custodian,
  Organisation,
  Permission,
  ProjectRole,
  ResearcherAccreditation,
  ResearcherAffiliation,
  ResearcherEducation,
  ResearcherProfessionalRegistration,
  ResearcherProject,
  ResearcherTraining,
  Sector,
  SystemConfig,
  User,
} from "../../types/application";
import { parseSystemConfig } from "../../utils/application";

interface ApplicationDataProps {
  systemConfigData: SystemConfig[];
  userData: User;
  organisationData: Organisation;
  sectorsData: Sector[];
  projectRolesData: ProjectRole[];
  permissionsData: Permission[];
  custodianData: Custodian;
  accreditationsData: ResearcherAccreditation[];
  educationData: ResearcherEducation[];
  trainingData: ResearcherTraining[];
  projectsData: ResearcherProject[];
  affiliationData: ResearcherAffiliation[];
  professionalRegistrationsData: ResearcherProfessionalRegistration[];
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
  projectRolesData,
  custodianData,
  accreditationsData,
  educationData,
  trainingData,
  projectsData,
  affiliationData,
  professionalRegistrationsData,
  isOrganisation,
  isCustodian,
  children,
}: ApplicationDataProps) {
  const path = usePathname();

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
    projectRoles: state.getProjectRoles(),
    setProjectRoles: state.setProjectRoles,
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
    projectRoles,
    setProjectRoles,
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
    setProjectRoles(projectRolesData);
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
      professionalRegistrations: professionalRegistrationsData,
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
    !!permissions?.length &&
    !!projectRoles?.length;

  return isAllSet && children;
}
