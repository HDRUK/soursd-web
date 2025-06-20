"use client";

import { ActionMenuItem } from "@/components/ActionMenu";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import {
  DeleteCustodianProjectOrganisationPayload,
  deleteCustodianProjectOrganisationQuery,
} from "@/services/custodian_approvals";
import { ProjectOrganisation, WithTranslations } from "@/types/application";
import { useMutation } from "@tanstack/react-query";

export type ProjectOrganisationsListActionMenuProps = WithTranslations<{
  projectId?: number;
  data: ProjectOrganisation;
  onDelete: () => void;
}>;

export default function ProjectOrganisationsListActionMenuItems({
  onDelete,
  data,
  t,
}: ProjectOrganisationsListActionMenuProps) {
  const { mutateAsync: deleteUserAsync, ...deleteQueryState } = useMutation(
    deleteCustodianProjectOrganisationQuery()
  );

  const showDeleteConfirm = useQueryConfirmAlerts(deleteQueryState, {
    confirmAlertProps: {
      preConfirm: async payload => {
        await deleteUserAsync(
          payload as DeleteCustodianProjectOrganisationPayload
        );

        onDelete();
      },
    },
  });

  return (
    <>
      <ActionMenuItem
        onClick={() => {
          showDeleteConfirm({
            projectId: data.project_id,
          });
        }}>
        {t("removeOrganisationFromProject")}
      </ActionMenuItem>
    </>
  );
}
