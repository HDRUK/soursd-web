"use client";

import {
  PageColumnDetails,
  PageBodyContainer,
  PageColumnBody,
  PageColumns,
} from "@/modules";

import { useQuery } from "@tanstack/react-query";

import getProjectQuery from "@/services/projects/getProjectQuery";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

/* turning off for now as not ready and probably not needed
import { useStore } from "@/data/store";
import { getCustodianProjectUserValidationLogsQuery } from "@/services/validation_logs";
import { getUserQuery } from "@/services/users";
*/

interface CustodianProjectUserProps {
  projectId: number;
  // userId: number;
}

const NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER = "CustodianProjectUser";

function CustodianProjectUser({
  projectId,
  // userId,
}: CustodianProjectUserProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_CUSTODIAN_PROJECT_USER);
  // const custodian = useStore(state => state.getCustodian());
  const { data: project, isFetched: isFetchedProject } = useQuery(
    getProjectQuery(projectId)
  );

  /* not sure this should be here... this is temporary anyway..
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
  */

  if (!project?.data && isFetchedProject) {
    notFound();
  }

  return (
    <PageBodyContainer
      heading={t("title", { projectTitle: project?.data.title })}>
      <PageColumns>
        <PageColumnBody lg={7}>Content!</PageColumnBody>
        <PageColumnDetails lg={5}>
          {/* not sure this should be here... this is temporary anyway..
          <ActionValidationPanel
            queryState={queryState}
            logs={validationLogs?.data || []}
          /> */}
        </PageColumnDetails>
      </PageColumns>
    </PageBodyContainer>
  );
}

export default CustodianProjectUser;
