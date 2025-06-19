import { ActionMenu } from "@/components/ActionMenu";
import KanbanBoardActionsMenuItems, {
  KanbanBoardActionsMenuItemsProps,
} from "@/modules/KanbanBoard/KanbanBoardActionMenuItems";
import ProjectUsersListActionMenuItems, {
  ProjectUsersListActionMenuProps,
} from "../ProjectUsersList/ProjectUsersListActionMenuItems";
import { CustodianProjectUser } from "@/types/application";

type ProjectUsersActionItemsProps = KanbanBoardActionsMenuItemsProps &
  ProjectUsersListActionMenuProps & {
    data: CustodianProjectUser;
  };

export default function ProjectUsersActionItems({
  data,
  onDelete,
  onPrimaryContactChange,
  t,
  ...restProps
}: ProjectUsersActionItemsProps) {
  return (
    <ActionMenu>
      {({ handleClose }) => (
        <>
          <KanbanBoardActionsMenuItems
            {...restProps}
            handleClose={handleClose}
            t={t}
          />
          <ProjectUsersListActionMenuItems
            data={data}
            onDelete={onDelete}
            onPrimaryContactChange={onPrimaryContactChange}
            t={t}
          />
        </>
      )}
    </ActionMenu>
  );
}
