"use client";

import { ActionMenuItem } from "@/components/ActionMenu";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import {
  DeleteCustodianProjectUserPayload,
  deleteCustodianProjectUserQuery,
} from "@/services/custodian_approvals";
import { putProjectUserPrimaryContactQuery } from "@/services/projects";
import { CustodianProjectUser, WithTranslations } from "@/types/application";
import { useMutation } from "@tanstack/react-query";

export type ProjectUsersListActionMenuProps = WithTranslations<{
  projectId?: number;
  data: CustodianProjectUser;
  onDelete: () => void;
  onPrimaryContactChange: () => void;
}>;

export default function ProjectUsersListActionMenuItems({
  onDelete,
  onPrimaryContactChange,
  data,
  t,
}: ProjectUsersListActionMenuProps) {
  const { mutateAsync: deleteUserAsync, ...deleteQueryState } = useMutation(
    deleteCustodianProjectUserQuery()
  );

  const { mutateAsync: makePrimaryContactAsync, ...primaryContactQueryState } =
    useMutation(putProjectUserPrimaryContactQuery());

  const showDeleteConfirm = useQueryConfirmAlerts(deleteQueryState, {
    confirmAlertProps: {
      preConfirm: async payload => {
        await deleteUserAsync(payload as DeleteCustodianProjectUserPayload);

        onDelete();
      },
    },
  });

  useQueryAlerts(primaryContactQueryState);

  const {
    project_id,
    primary_contact,
    registry: { id: registryId },
  } = data;

  return (
    <>
      <ActionMenuItem
        onClick={() => {
          showDeleteConfirm({
            projectId: project_id,
            registryId,
          });
        }}>
        {t("removeUserFromProject")}
      </ActionMenuItem>
      <ActionMenuItem
        onClick={async () => {
          await makePrimaryContactAsync({
            projectId: project_id,
            registryId,
            primaryContact: !primary_contact,
          });

          onPrimaryContactChange();
        }}>
        {!primary_contact
          ? t("makePrimaryContact")
          : t("removeAsPrimaryContact")}
      </ActionMenuItem>
    </>
  );
}
