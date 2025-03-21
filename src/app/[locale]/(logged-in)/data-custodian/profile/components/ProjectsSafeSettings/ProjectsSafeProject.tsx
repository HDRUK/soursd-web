import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import {
  PutProjectDetailsPayload,
  putProjectDetailsQuery,
} from "@/services/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ProjectsSafeSettingsForm from "../ProjectsSafeSettingsForm";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafeProject() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const projectDetails = useStore(state => state.getProjectDetails());

  const { mutateAsync: mutatePutAsync, ...restPutQueryState } = useMutation(
    putProjectDetailsQuery(projectDetails?.id)
  );

  const handleSubmit = async (payload: PutProjectDetailsPayload) => {
    await mutatePutAsync(payload);

    queryClient.refetchQueries({
      queryKey: ["getProjectDetails", projectDetails.id],
    });
  };

  useQueryAlerts(restPutQueryState);

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <ProjectsSafeSettingsForm
        queryState={restPutQueryState}
        projectDetails={projectDetails}
        onSubmit={handleSubmit}
      />
    </PageGuidance>
  );
}
