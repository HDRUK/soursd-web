"use client";

import { ActionMenuItem } from "@/components/ActionMenu";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import useMutateDeleteEntityFromProjectWithConfirmation from "@/queries/useMutateDeleteEntityFromProjectWithConfirmation";
import { putProjectUserPrimaryContactQuery } from "@/services/projects";
import { EntityType } from "@/types/api";
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
  const { showConfirm } = useMutateDeleteEntityFromProjectWithConfirmation({
    entityType: EntityType.USER,
    onDelete,
  });

  const { mutateAsync: makePrimaryContactAsync, ...primaryContactQueryState } =
    useMutation(putProjectUserPrimaryContactQuery());

  useQueryAlerts(primaryContactQueryState);

  const {
    project_has_user: {
      id,
      project_id,
      primary_contact,
      registry: { id: registryId },
    },
  } = data;

  return (
    <>
      <ActionMenuItem
        onClick={() => {
          showConfirm(id);
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
