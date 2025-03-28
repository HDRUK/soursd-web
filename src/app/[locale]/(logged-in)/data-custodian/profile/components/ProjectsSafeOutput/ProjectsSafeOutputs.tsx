import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageGuidance, PageSection } from "@/modules";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { toFieldArrayString } from "@/utils/form";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ProjectsSafeOutputsForm from "../ProjectsSafeOutputsForm";
import { ProjectsSafeOutputsFormFieldValues } from "../ProjectsSafeOutputsForm/ProjectsSafeOutputsForm";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafeOutputs() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const project = useStore(state => state.getProject());

  const { mutateAsync, queryState } = useMutateProjectDetails(project.id);

  const handleSubmit = async (payload: ProjectsSafeOutputsFormFieldValues) => {
    await mutateAsync({
      ...project.project_detail,
      ...payload,
      research_outputs: toFieldArrayString(payload.research_outputs),
    });

    queryClient.refetchQueries({
      queryKey: ["getProject", project.id],
    });
  };

  useQueryAlerts(queryState);

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody heading={t("safeOutputs")}>
        <PageSection>
          <ProjectsSafeOutputsForm
            queryState={queryState}
            projectDetails={project.project_detail}
            onSubmit={handleSubmit}
          />
        </PageSection>
      </PageBody>
    </PageGuidance>
  );
}
