import { mockedSafeProjectGuidanceProps } from "@/mocks/data/cms";
import { PageGuidance } from "@/modules";
import ProjectsSafeProjectForm from "../ProjectsSafeProjectForm";
import { useMutation } from "@tanstack/react-query";
import { putProjectQuery } from "@/services/projects";
import { useStore } from "@/data/store";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import { PutProjectPayload } from "@/services/projects/types";

export default function ProjectsSafeProject() {
  const project = useStore(state => state.getProject());

  const { mutateAsync: mutatePutAsync, ...restPutQueryState } = useMutation(
    putProjectQuery(project.id)
  );

  // const showDeleteConfirm = useQueryConfirmAlerts<number>(restPutQueryState, {
  //   confirmAlertProps: {
  //     willClose: async payload => {
  //       await mutatePutAsync(payload as PutProjectPayload);
  //     },
  //   },
  // });

  return (
    <PageGuidance {...mockedSafeProjectGuidanceProps}>
      <ProjectsSafeProjectForm
        queryState={restPutQueryState}
        project={project}
        onSubmit={() => {
          console.log("SUBMITTING");
          // showDeleteConfirm(project.id);
        }}
      />
    </PageGuidance>
  );
}
