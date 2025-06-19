"use client";

import { ActionMenuItem } from "@/components/ActionMenu";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useQueryConfirmAlerts from "@/hooks/useQueryConfirmAlerts";
import {
  DeleteProjectUserPayload,
  deleteProjectUserQuery,
  putProjectUserPrimaryContactQuery,
} from "@/services/projects";
import { ProjectUser, WithTranslations } from "@/types/application";
import { useMutation } from "@tanstack/react-query";

export type ProjectUsersListActionMenuProps = WithTranslations<{
  projectId?: number;
  data: ProjectUser;
  onDelete: () => void;
  onPrimaryContactChange: () => void;
}>;

export default function ProjectUsersListActionMenuItems({
  onDelete,
  onPrimaryContactChange,
  data,
  t,
}: ProjectUsersListActionMenuProps) {
  console.log("ON DELETE", onDelete);
  const { mutateAsync: deleteUserAsync, ...deleteQueryState } = useMutation(
    deleteProjectUserQuery()
  );

  const { mutateAsync: makePrimaryContactAsync, ...primaryContactQueryState } =
    useMutation(putProjectUserPrimaryContactQuery());

  const showDeleteConfirm = useQueryConfirmAlerts(deleteQueryState, {
    confirmAlertProps: {
      preConfirm: async payload => {
        await deleteUserAsync(payload as DeleteProjectUserPayload);

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
