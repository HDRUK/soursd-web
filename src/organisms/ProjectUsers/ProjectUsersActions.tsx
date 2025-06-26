import { ActionMenu, ActionMenuItem } from "@/components/ActionMenu";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import KanbanBoardActionsMenuItems from "@/modules/KanbanBoard/KanbanBoardActionMenuItems";
import useMutateDeleteEntityFromProjectWithConfirmation from "@/queries/useMutateDeleteEntityFromProjectWithConfirmation";
import { putProjectUserPrimaryContactQuery } from "@/services/projects";
import { EntityType } from "@/types/api";
import { CustodianProjectUser, WithTranslations } from "@/types/application";
import { useMutation } from "@tanstack/react-query";

export type ProjectUsersActionsProps<T = CustodianProjectUser> =
  WithTranslations<{
    data: T;
    projectId?: number;
    onDelete: () => void;
    onPrimaryContactChange: () => void;
    onMoveClick: (id: number, status: string) => void;
    allowedTransitions: string[];
  }>;

export default function ProjectUsersActions({
  onMoveClick,
  onDelete,
  onPrimaryContactChange,
  data,
  t,
  allowedTransitions,
  ...restProps
}: ProjectUsersActionsProps) {
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
    <ActionMenu>
      {({ handleClose }) => (
        <>
          <KanbanBoardActionsMenuItems
            onMoveClick={(id: number, status: string) => {
              onMoveClick(id, status);

              handleClose();
            }}
            allowedTransitions={allowedTransitions}
            data={data}
            t={t}
            handleClose={handleClose}
            {...restProps}
          />
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
      )}
    </ActionMenu>
  );
}
