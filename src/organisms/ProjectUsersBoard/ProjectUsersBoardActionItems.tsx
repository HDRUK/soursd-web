import KanbanBoardActionsMenuItems, {
  KanbanBoardActionsMenuItemsProps,
} from "@/modules/KanbanBoard/KanbanBoardActionMenuItems";
import { CustodianProjectUser } from "@/types/application";
import ProjectUsersListActionMenuItems, {
  ProjectUsersListActionMenuProps,
} from "../ProjectUsersList/ProjectUsersListActionMenuItems";

type ProjectUsersBoardActionItemsProps = KanbanBoardActionsMenuItemsProps &
  ProjectUsersListActionMenuProps & {
    data: CustodianProjectUser;
  };

export default function ProjectUsersBoardActionItems({
  data,
  onDelete,
  onPrimaryContactChange,
  t,
  ...restProps
}: ProjectUsersBoardActionItemsProps) {
  return (
    <>
      <KanbanBoardActionsMenuItems {...restProps} t={t} />
      <ProjectUsersListActionMenuItems
        data={data}
        onDelete={onDelete}
        onPrimaryContactChange={onPrimaryContactChange}
        t={t}
      />
    </>
  );
}
