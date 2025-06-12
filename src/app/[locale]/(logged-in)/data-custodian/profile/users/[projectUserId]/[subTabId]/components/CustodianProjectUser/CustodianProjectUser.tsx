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
import ActionValidationPanel from "@/organisms/ActionValidationPanel";
import { ActionValidationVariants } from "@/organisms/ActionValidationPanel/ActionValidationPanel";
import { getProjectUserQuery } from "@/services/project_users";
import getProjectQuery from "@/services/projects/getProjectQuery";
import UserDetails from "@/components/UserDetails";
import { UserSubTabs } from "../../../../../consts/tabs";
import SubTabsSections from "../SubTabSections";
import SubTabsContents from "../SubsTabContents";

interface CustodianProjectUserProps {
  projectUserId: number;
  subTabId: UserSubTabs;
}

const NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER = "CustodianProjectUser";

function CustodianProjectUser({
  projectUserId,
  subTabId,
}: CustodianProjectUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER);
  const custodian = useStore(state => state.getCustodian());

  const { data: projectUser, isFetched: isFetchedProjectUser } = useQuery(
    getProjectUserQuery(projectUserId)
  );
  const { registry, project } = projectUser?.data || {};

  const { data: userData, isFetched } = useQuery({
    ...getUserQuery(+registry?.user?.id),
    enabled: !!registry?.user?.id,
  });

  if (userData?.data.user_group !== UserGroup.USERS && isFetched) {
    notFound();
  }

  const { data: validationLogs, ...queryState } = useQuery({
    ...getCustodianProjectUserValidationLogsQuery(
      custodian?.id as number,
      project?.id as number,
      registry?.id as number
    ),
    enabled: !!registry?.id,
  });

  if (!project && isFetchedProjectUser) {
    notFound();
  }

  const { user, setUser, setProject } = useStore(state => ({
    user: state.getCurrentUser(),
    setUser: state.setCurrentUser,
    setProject: state.setCurrentProject,
  }));

  useEffect(() => {
    if (project) setProject(project);
  }, [projectUser]);

  useEffect(() => {
    if (userData?.data) setUser(userData.data);
  }, [userData]);

  return (
    user && (
      <PageBodyContainer heading={t("title", { projectTitle: project?.title })}>
        <PageColumns>
          <PageColumnBody lg={8}>
            <UserDetails user={user} />
            <SubTabsSections
              projectUserId={projectUserId}
              subTabId={subTabId}
            />
            <SubTabsContents userId={user.id} subTabId={subTabId} />
          </PageColumnBody>
          <PageColumnDetails lg={4}>
            <ActionValidationPanel
              variant={ActionValidationVariants.ProjectUser}
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
