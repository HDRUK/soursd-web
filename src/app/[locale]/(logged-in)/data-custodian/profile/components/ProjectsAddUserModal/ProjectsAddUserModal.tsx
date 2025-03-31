import FormModal, { FormModalProps } from "@/components/FormModal";
import { putProjectUsersQuery } from "@/services/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { ProjectAllUser } from "@/types/application";
import { useTranslations } from "next-intl";
import ProjectsAddUserForm from "../ProjectsAddUserForm";

interface ProjectsAddUserModaProps extends Omit<FormModalProps, "children"> {
  projectId: number;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION = "ProjectsAddUserModal";

export default function ProjectsAddUserModal({
  projectId,
  onClose,
  ...restProps
}: ProjectsAddUserModaProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);
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
      heading={t("heading")}
      description={t("description")}
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
