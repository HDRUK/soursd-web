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

  const addUrlToHistory = useStore(state => state.addUrlToHistory);

  const setUser = useStore(state => state.setUser);
  const user = useStore(state => state.config.user);

  const setOrganisation = useStore(state => state.setOrganisation);
  const organisation = useStore(state => state.config.organisation);

  const setCustodian = useStore(state => state.setCustodian);
  const custodian = useStore(state => state.config.custodian);

  const setSectors = useStore(state => state.setSectors);
  const sectors = useStore(state => state.config.sectors);

  const setPermissions = useStore(state => state.setPermissions);
  const permissions = useStore(state => state.config.permissions);

  const setProjectRoles = useStore(state => state.setProjectRoles);
  const projectRoles = useStore(state => state.config.projectRoles);

  const setHistories = useStore(state => state.setHistories);
  const histories = useStore(state => state.config.histories);

  const setApplication = useStore(state => state.setApplication);
  const application = useStore(state => state.application);

  useEffect(() => {
    setApplication({
      routes: ROUTES,
      system: parseSystemConfig(systemConfigData),
    });
  }, [systemConfigData, setApplication]);

  useEffect(() => {
    setUser(userData);
    setOrganisation(organisationData);
    setCustodian(custodianData);
    setSectors(sectorsData);
    setPermissions(permissionsData);
    setProjectRoles(projectRolesData);
  }, [
    userData,
    organisationData,
    custodianData,
    sectorsData,
    permissionsData,
    projectRolesData,
    setUser,
    setOrganisation,
    setCustodian,
    setSectors,
    setPermissions,
    setProjectRoles,
  ]);

  useEffect(() => {
    setHistories({
      accreditations: accreditationsData,
      education: educationData,
      training: trainingData,
      employments: [], // static
      approvedProjects: projectsData,
      affiliations: affiliationData,
      professionalRegistrations: professionalRegistrationsData,
    });
  }, [
    accreditationsData,
    educationData,
    trainingData,
    projectsData,
    affiliationData,
    professionalRegistrationsData,
    setHistories,
  ]);

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
