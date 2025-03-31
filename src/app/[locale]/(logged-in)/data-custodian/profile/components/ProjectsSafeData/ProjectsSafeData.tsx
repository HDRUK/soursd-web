import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageSection } from "@/modules";
import PageGuidance from "@/modules/PageGuidance";
import ProjectsSafeDataForm from "@/modules/ProjectsSafeDataForm";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/project_details";
import { ProjectDetails } from "@/types/application";
import { createProjectDetailDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProjectImport from "../ProjectImport";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = [
  "datasets",
  "data_sensitivity_level",
  "legal_basis_for_data_article6",
  "duty_of_confidentiality",
  "national_data_optout",
  "request_frequency",
  "dataset_linkage_description",
  "data_minimisation",
  "data_use_description",
  "access_date",
];

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
        heading={t("safeData")}
        actions={
          <ProjectImport
            custodianId={custodian.id}
            projectId={project.id}
            onImported={handleGatewayProjectImport}
            isImportDisabled={!project?.unique_id}
          />
        }>
        <PageSection>
          <ProjectsSafeDataForm
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
