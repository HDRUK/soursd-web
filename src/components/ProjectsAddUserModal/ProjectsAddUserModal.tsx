import FormModal, { FormModalProps } from "@/components/FormModal";
import { putProjectUsersQuery } from "@/services/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import { ProjectAllUser } from "@/types/application";
import { useTranslations } from "next-intl";
import { showAlert } from "@/utils/showAlert";
import ProjectsAddUserForm from "../ProjectsAddUserForm";

interface ProjectsAddUserModaProps extends Omit<FormModalProps, "children"> {
  request: boolean;
  projectId: number;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION = "ProjectsAddUserModal";

export default function ProjectsAddUserModal({
  request = false,
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
    if (request) {
      // to be implemented - need a flow to requesting users are added to a project by an organisation
      showAlert("warning", {
        text: "This does nothing yet, this feature has not been implemented",
      });
    } else {
      await mutateAsync({
        params: {
          id: projectId,
        },
        payload: { users: projectUsers },
      });
    }
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
      heading={request ? t("requestHeading") : t("heading")}
      description={request ? t("requestDescription") : t("description")}
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
