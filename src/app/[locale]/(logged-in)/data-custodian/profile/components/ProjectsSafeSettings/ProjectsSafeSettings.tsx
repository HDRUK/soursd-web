import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageGuidance, PageSection } from "@/modules";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProjectImport from "../ProjectImport";
import ProjectsSafeSettingsForm from "@/modules/ProjectsSafeSettingsForm";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = ["access_type", "data_privacy"];

export default function ProjectsSafeProject() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();

  const { project, custodian } = useStore(state => ({
    project: state.getProject(),
    custodian: state.getCustodian(),
  }));

  const { mutateAsync, mutateState } = useMutateProjectDetails(project.id);

  const [defaultValues, setDefaultValues] = useState(
    pick(
      createProjectDetailDefaultValues(project.project_detail || {}),
      PAYLOAD_FIELDS
    )
  );

  const handleGatewayProjectImport = (data: ProjectDetails) => {
    setDefaultValues(pick(data, PAYLOAD_FIELDS));
  };

  const handleSubmit = async (payload: PutProjectDetailsPayload) => {
    await mutateAsync({
      ...project.project_detail,
      ...payload,
    });

    queryClient.refetchQueries({
      queryKey: ["getProject", project.id],
    });
  };

  useQueryAlerts(mutateState);

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody
        heading={t("safeSettings")}
        actions={
          <ProjectImport
            custodianId={custodian.id}
            projectId={project.id}
            onImported={handleGatewayProjectImport}
            isImportDisabled={!project?.unique_id}
          />
        }>
        <PageSection>
          <ProjectsSafeSettingsForm
            defaultValues={defaultValues}
            mutateState={mutateState}
            projectId={project.id}
            onSubmit={handleSubmit}
          />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
