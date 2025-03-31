import FormModal, { FormModalProps } from "@/components/FormModal";
import { putProjectUsersQuery } from "@/services/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { ProjectAllUser } from "@/types/application";
import ProjectsAddUserForm from "../ProjectsAddUserForm";

interface ProjectsAddUserModaProps extends Omit<FormModalProps, "children"> {
  projectId: number;
  onClose: () => void;
}

export default function ProjectsAddUserModal({
  projectId,
  onClose,
  ...restProps
}: ProjectsAddUserModaProps) {
  const queryClient = useQueryClient();
  const { mutateAsync, ...putProjectUsersMutationState } = useMutation(
    putProjectUsersQuery()
  );

  const handleSave = async (projectUsers: ProjectAllUser[]) => {
    await mutateAsync({
      params: {
        id: projectId,
      },
      payload: { users: projectUsers },
    });
  };

  useQueryAlerts(putProjectUsersMutationState, {
    successAlertProps: {
      willClose: () => {
        queryClient.refetchQueries({
          queryKey: ["getProjectUsers", projectId],
        });
        onClose?.();
      },
    },
  });

  return (
    <FormModal
      variant="content"
      heading="Add new team member"
      description="Here’s where you can add a team member to your project. If you can't find them or they're listed under the wrong Organisation, invite them here. If they already have a SOURSD account, they’ll be able to select the correct Organisation. Otherwise, they'll be prompted to register for a SOURSD account."
      onClose={onClose}
      {...restProps}>
      <ProjectsAddUserForm
        projectId={projectId}
        mutationState={putProjectUsersMutationState}
        onSave={handleSave}
      />
    </FormModal>
  );
}
