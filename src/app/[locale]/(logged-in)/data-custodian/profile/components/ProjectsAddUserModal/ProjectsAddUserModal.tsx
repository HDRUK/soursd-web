import FormModal, { FormModalProps } from "@/components/FormModal";
import postProjectUsersQuery from "@/services/projects/postProjectUsersQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProjectsAddUserForm, { RowUserState } from "../ProjectsAddUserForm";
import useQueryAlerts from "@/hooks/useQueryAlerts";

interface ProjectsSafePeopleModalProps
  extends Omit<FormModalProps, "children"> {
  custodianId: number;
  projectId: number;
}

export default function ProjectsSafePeopleModal({
  custodianId,
  projectId,
  onClose,
  ...restProps
}: ProjectsSafePeopleModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync, ...putProjectUsersMutationState } = useMutation(
    postProjectUsersQuery()
  );

  const handleSave = async (users: RowUserState) => {
    await mutateAsync({
      params: {
        id: projectId,
      },
      payload: { users },
    });
  };

  useQueryAlerts(putProjectUsersMutationState, {
    successAlertProps: {
      willClose: () => {
        queryClient.refetchQueries({
          queryKey: ["getCustodianProjectUsers", custodianId, projectId],
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
        mutationState={putProjectUsersMutationState}
        onSave={handleSave}
      />
    </FormModal>
  );
}
