"use client";

import { ActionMenuItem } from "@/components/ActionMenu";
import useMutateDeleteEntityFromProjectWithConfirmation from "@/queries/useMutateDeleteEntityFromProjectWithConfirmation";
import { EntityType } from "@/types/api";
import {
  CustodianProjectOrganisation,
  WithTranslations,
} from "@/types/application";

export type ProjectOrganisationsListActionMenuProps = WithTranslations<{
  projectId?: number;
  data: CustodianProjectOrganisation;
  onDelete: () => void;
}>;

export default function ProjectOrganisationsListActionMenuItems({
  onDelete,
  data,
  t,
}: ProjectOrganisationsListActionMenuProps) {
  const { showConfirm } = useMutateDeleteEntityFromProjectWithConfirmation({
    entityType: EntityType.ORGANISATION,
    onDelete,
  });

  const {
    project_organisation: { id },
  } = data;

  return (
    <ActionMenuItem
      onClick={() => {
        showConfirm(id);
      }}>
      {t("removeOrganisationFromProject")}
    </ActionMenuItem>
  );
}
