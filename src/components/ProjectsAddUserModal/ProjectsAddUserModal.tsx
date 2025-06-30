import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import FormModal, { FormModalProps } from "../FormModal";
import { putProjectUsersQuery } from "../../services/projects";
import useQueryAlerts from "../../hooks/useQueryAlerts";
import { ProjectAllUser } from "../../types/application";
import { showAlert } from "../../utils/showAlert";
import ProjectsAddUserForm from "../ProjectsAddUserForm";

interface ProjectsAddUserModaProps extends Omit<FormModalProps, "children"> {
  request: boolean;
  projectId: number;
  custodianId: number;
  onClose: () => void;
}

const NAMESPACE_TRANSLATION = "ProjectsAddUserModal";

export default function ProjectsAddUserModal({
  request = false,
  projectId,
  custodianId,
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
      console.log({
        users: projectUsers.filter(u => u.project_user_id || u.role),
      });
      await mutateAsync({
        params: {
          id: projectId,
        },
        payload: {
          users: projectUsers.filter(u => u.project_user_id || u.role),
        },
      });
    }
  };

  useQueryAlerts(putProjectUsersMutationState, {
    successAlertProps: {
      willClose: () => {
        queryClient.refetchQueries({
          queryKey: ["getPaginatedCustodianProjectUsers", custodianId],
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
