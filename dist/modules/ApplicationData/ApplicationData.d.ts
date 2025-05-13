import { Custodian, Organisation, Permission, ProjectRole, ResearcherAccreditation, ResearcherAffiliation, ResearcherEducation, ResearcherProfessionalRegistration, ResearcherProject, ResearcherTraining, Sector, SystemConfig, User } from "@/types/application";
import { ReactNode } from "react";
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
export default function ApplicationData({ systemConfigData, userData, organisationData, sectorsData, permissionsData, projectRolesData, custodianData, accreditationsData, educationData, trainingData, projectsData, affiliationData, professionalRegistrationsData, isOrganisation, isCustodian, children, }: ApplicationDataProps): any;
export {};
