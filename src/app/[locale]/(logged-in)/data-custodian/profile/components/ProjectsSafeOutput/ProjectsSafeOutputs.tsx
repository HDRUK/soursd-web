import { useStore } from "@/data/store";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageBody, PageGuidance, PageSection } from "@/modules";
import useMutateProjectDetails from "@/queries/useMutateProjectDetails";
import { PutProjectDetailsPayload } from "@/services/project_details";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import ProjectsSafeOutputsForm from "../ProjectsSafeOutputsForm";

const NAMESPACE_TRANSLATION = "CustodianProfile";

export default function ProjectsSafeOutputs() {
  const t = useTranslations(NAMESPACE_TRANSLATION);
  const queryClient = useQueryClient();
  const project = useStore(state => state.getProject());

  const { mutateAsync, queryState } = useMutateProjectDetails(project.id);

  // const handleSubmit = async (fields: WebhookFormData) => {

  //   await Promise.all([
  //     ...webhooksToDelete.map(webhook =>
  //       handleWebhookOperation("delete", webhook)
  //     ),
  //     ...webhooksToAdd.map(webhook => handleWebhookOperation("add", webhook)),
  //   ]);

  //   await refetchWebhookData();
  // };

  const handleSubmit = async (payload: PutProjectDetailsPayload) => {
    console.log({
      ...project.project_detail,
      ...payload,
      data_access: payload.data_access?.map(({ url }) => url).join(";"),
    });
    await mutateAsync({
      ...project.project_detail,
      ...payload,
      data_access: payload.data_access?.map(({ url }) => url).join(";"),
    });

    queryClient.refetchQueries({
      queryKey: ["getProject", project.id],
    });
  };

  useQueryAlerts(queryState);

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <PageBody heading={t("safeOutput")}>
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
