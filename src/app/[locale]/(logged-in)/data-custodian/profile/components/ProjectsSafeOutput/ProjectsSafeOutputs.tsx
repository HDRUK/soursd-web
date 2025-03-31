import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageGuidance, PageSection } from "@/modules";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProjectImport from "../ProjectImport";
import ProjectsSafeOutputsForm from "../ProjectsSafeOutputsForm";
import { ProjectsSafeOutputsFormFieldValues } from "../ProjectsSafeOutputsForm/ProjectsSafeOutputsForm";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = ["data_assets", "research_outputs"];

export default function ProjectsSafeOutputs() {
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

  const handleSubmit = async (payload: ProjectsSafeOutputsFormFieldValues) => {
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
        heading={t("safeOutputs")}
        actions={
          <ProjectImport
            custodianId={custodian.id}
            projectId={project.id}
            onImported={handleGatewayProjectImport}
            isImportDisabled={!project?.unique_id}
          />
        }>
        <PageSection>
          <ProjectsSafeOutputsForm
            projectId={project.id}
            defaultValues={defaultValues}
            mutateState={mutateState}
            onSubmit={handleSubmit}
          />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
