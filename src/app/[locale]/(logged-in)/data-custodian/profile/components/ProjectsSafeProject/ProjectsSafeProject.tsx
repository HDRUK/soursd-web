import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageGuidance } from "@/modules";
import { putProjectQuery } from "@/services/projects";
import { PutProjectPayload } from "@/services/projects/types";
import { ResearcherProject } from "@/types/application";
import { createProjectDefaultValues } from "@/utils/form";
import { pick } from "@/utils/json";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ProjectImport from "../ProjectImport";
import ProjectsSafeProjectForm from "../ProjectsSafeProjectForm";

const NAMESPACE_TRANSLATION = "CustodianProfile";

const PAYLOAD_FIELDS = [
  "unique_id",
  "title",
  "request_category_type",
  "start_date",
  "end_date",
  "lay_summary",
  "public_benefit",
  "technical_summary",
  "other_approval_committees",
  "status",
];

export default function ProjectsSafeProject() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const { custodian, project } = useStore(state => ({
    custodian: state.getCustodian(),
    project: state.getProject(),
  }));

  const { mutateAsync: mutatePutAsync, ...mutateState } =
    useMutation(putProjectQuery());

  const defaultValues = pick(
    createProjectDefaultValues(project),
    PAYLOAD_FIELDS
  );
  const [values, setValues] = useState();

  const formOptions = {
    defaultValues,
    values,
  };

  const handleGatewayProjectImport = (data: ResearcherProject) => {
    setValues(pick(data, PAYLOAD_FIELDS));
  };

  const handleSubmit = async (payload: PutProjectPayload) => {
    await mutatePutAsync({
      params: {
        id: project.id,
      },
      payload,
    });

    queryClient.refetchQueries({ queryKey: ["getProject", project.id] });
  };

  useQueryAlerts(mutateState, {
    errorAlertProps: {
      text: t("safeProjectWorkflowStatusError"),
    },
  });

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody
        heading={t("safeProject")}
        actions={
          <ProjectImport
            custodianId={custodian.id}
            projectId={project.id}
            onImported={handleGatewayProjectImport}
            isImportDisabled={!project?.unique_id}
          />
        }>
        <ProjectsSafeProjectForm
          {...formOptions}
          values={values}
          mutateState={mutateState}
          project={project}
          onSubmit={handleSubmit}
        />
      </PageBody>
    </PageGuidance>
  );
}
