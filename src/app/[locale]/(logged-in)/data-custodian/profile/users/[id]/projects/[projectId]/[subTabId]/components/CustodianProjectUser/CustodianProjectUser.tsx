"use client";

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import {
  PageColumnDetails,
  PageBodyContainer,
  PageColumnBody,
  PageColumns,
} from "@/modules";
import { UserGroup } from "@/consts/user";
import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { getCustodianProjectUserValidationLogsQuery } from "@/services/validation_logs";
import { getUserQuery } from "@/services/users";
import ActionValidationPanel from "@/modules/ActionValidationPanel";
import getProjectQuery from "@/services/projects/getProjectQuery";
import UserDetails from "@/components/UserDetails";
import { UserSubTabs } from "../../../../../../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface CustodianProjectUserProps {
  projectId: number;
  userId: number;
  subTabId: UserSubTabs;
}

const NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER = "CustodianProjectUser";

function CustodianProjectUser({
  projectId,
  userId,
  subTabId,
}: CustodianProjectUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER);
  const custodian = useStore(state => state.getCustodian());
  const { data: project, isFetched: isFetchedProject } = useQuery(
    getProjectQuery(projectId)
  );

  const { data: userData, isFetched } = useQuery(getUserQuery(+userId));

  if (userData?.data.user_group !== UserGroup.USERS && isFetched) {
    notFound();
  }

  const { registry_id: registryId } = userData?.data || {};

  const { data: validationLogs, ...queryState } = useQuery({
    ...getCustodianProjectUserValidationLogsQuery(
      custodian?.id as number,
      projectId,
      registryId as number
    ),
    enabled: !!registryId,
  });

  if (!project?.data && isFetchedProject) {
    notFound();
  }

  const [user, setUser, setProject] = useStore(state => [
    state.getCurrentUser(),
    state.setCurrentUser,
    state.setCurrentProject,
  ]);

  useEffect(() => {
    if (project) setProject(project?.data);
  }, [project]);

  useEffect(() => {
    if (userData?.data) setUser(userData?.data);
  }, [userData]);

  return (
    user && (
      <PageBodyContainer
        heading={t("title", { projectTitle: project?.data.title })}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <UserDetails user={user} />
            <SubTabsSections
              userId={userId}
              projectId={projectId}
              subTabId={subTabId}
            />
            <SubTabsContents userId={userId} subTabId={subTabId} />
          </PageColumnBody>
          <PageColumnDetails lg={4}>
            <ActionValidationPanel
              queryState={queryState}
              logs={validationLogs?.data || []}
            />
          </PageColumnDetails>
        </PageColumns>
      </PageBodyContainer>
    )
  );
}

export default CustodianProjectUser;
