"use client";

import ContactLink from "@/components/ContactLink";
import LoadingWrapper from "@/components/LoadingWrapper";
import OverlayCenterAlert from "@/components/OverlayCenterAlert";
import PageBodyContainer from "@/modules/PageBodyContainer";
import useApplicationDependencies from "@/queries/useApplicationDependencies";
import useQueriesHistories from "@/queries/useQueriesHistories";
import { User } from "@/types/application";
import { getCombinedQueryState } from "@/utils/query";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import ApplicationData from "../ApplicationData";

interface ApplicationProps {
  children: ReactNode;
  custodianId?: number;
  organisationId?: number;
  me?: User;
}

const NAMESPACE_TRANSLATION_APPLICATION = "Application";

export default function Application({
  children,
  me,
  custodianId,
  organisationId,
}: ApplicationProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

  const { data: applicationData, ...applicationQueryState } =
    useApplicationDependencies(
      {
        user: me,
        custodianId,
        organisationId,
      },
      {
        queryKeySuffix: ["initial"],
        enabled: !!me,
      }
    );

  const { data: historiesData, ...historiesQueryState } = useQueriesHistories(
    me?.registry_id,
    {
      queryKeySuffix: ["initial"],
      enabled: !!me?.registry_id,
    }
  );

  const {
    getAccreditations: accreditationsData,
    getEducations: educationData,
    getTrainings: trainingData,
    getUserApprovedProjects: projectsData,
    getAffiliations: affiliationData,
    getProfessionalRegistrations: professionalRegistratonsData,
  } = historiesData;

  const {
    getSystemConfig: systemConfigData,
    getUser: userData,
    getOrganisation: organisationData,
    getSectors: sectorsData,
    getPermissions: permissionsData,
    getCustodian: custodianData,
  } = applicationData;

  const { isLoading, isError } = getCombinedQueryState([
    historiesQueryState,
    applicationQueryState,
  ]);

  return isError ? (
    <PageBodyContainer>
      <OverlayCenterAlert>
        {t.rich("getDependenciesError", {
          contactLink: ContactLink,
        })}
      </OverlayCenterAlert>
    </PageBodyContainer>
  ) : (
    <LoadingWrapper loading={isLoading} variant="basic">
      <ApplicationData
        isOrganisation={!!organisationId}
        isCustodian={!!custodianId}
        systemConfigData={systemConfigData?.data}
        userData={userData?.data}
        organisationData={organisationData?.data}
        sectorsData={sectorsData?.data.data}
        permissionsData={permissionsData?.data.data}
        custodianData={custodianData?.data}
        accreditationsData={accreditationsData?.data.data}
        educationData={educationData?.data}
        trainingData={trainingData?.data}
        projectsData={projectsData?.data}
        affiliationData={affiliationData?.data.data}
        professionalRegistratonsData={professionalRegistratonsData?.data?.data}>
        {children}
      </ApplicationData>
    </LoadingWrapper>
  );
}
