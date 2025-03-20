import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import { putProjectQuery } from "@/services/projects";
import { PutProjectPayload } from "@/services/projects/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ProjectsSafeProjectForm from "../ProjectsSafeProjectForm";
import { useMutation } from "@tanstack/react-query";
import { putProjectQuery } from "@/services/projects";
import { PutProjectPayload } from "@/services/projects/types";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ProjectsSafeProjectForm from "../ProjectsSafeProjectForm";
import { useTranslations } from "next-intl";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafeProject() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const project = useStore(state => state.getProject());

  const { mutateAsync: mutatePutAsync, ...restPutQueryState } = useMutation(
    putProjectQuery(project.id)
  );

  const handleSubmit = async (payload: PutProjectPayload) => {
    await mutatePutAsync(payload);

    queryClient.refetchQueries({ queryKey: ["getProject", project.id] });
  };

  useQueryAlerts(restPutQueryState, {
    errorAlertProps: {
      text: t("safeProjectWorkflowStatusError"),
    },
  });

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <ProjectsSafeProjectForm
        queryState={restPutQueryState}
        project={project}
        onSubmit={handleSubmit}
      />
    </PageGuidance>
  );
}
