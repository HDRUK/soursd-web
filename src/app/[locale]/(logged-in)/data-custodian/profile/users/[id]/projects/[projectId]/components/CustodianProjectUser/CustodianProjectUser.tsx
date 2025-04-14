"use client";

import {
  PageColumnDetails,
  PageBodyContainer,
  PageColumnBody,
  PageColumns,
} from "@/modules";
import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { getCustodianProjectUserValidationLogsQuery } from "@/services/validation_logs";
import { getUserQuery } from "@/services/users";
import ActionValidationPanel from "@/modules/ActionValidationPanel";
import getProjectQuery from "@/services/projects/getProjectQuery";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { UserSubTabs } from "../../const/tabs";
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

  const { data: userData } = useQuery(getUserQuery(userId));

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

  return (
    <PageBodyContainer
      heading={t("title", { projectTitle: project?.data.title })}>
      <PageColumns>
        <PageColumnBody lg={7}>
          <SubTabsSections
            projectId={projectId}
            userId={userId}
            subTabId={subTabId}
          />
          <SubTabsContents userId={userId} subTabId={subTabId} />
        </PageColumnBody>
        <PageColumnDetails lg={5}>
          <ActionValidationPanel
            queryState={queryState}
            logs={validationLogs?.data || []}
          />
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default CustodianProjectUser;
