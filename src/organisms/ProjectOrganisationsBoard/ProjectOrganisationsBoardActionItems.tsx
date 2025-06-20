import KanbanBoardActionsMenuItems, {
  KanbanBoardActionsMenuItemsProps,
} from "@/modules/KanbanBoard/KanbanBoardActionMenuItems";
import { CustodianProjectOrganisation } from "@/types/application";
import ProjectOrganisationsListActionMenuItems, {
  ProjectOrganisationsListActionMenuProps,
} from "../ProjectOrganisationsList/ProjectOrganisationsListActionMenuItems";

type ProjectOrganisationsBoardActionItemsProps =
  KanbanBoardActionsMenuItemsProps &
    ProjectOrganisationsListActionMenuProps & {
      data: CustodianProjectOrganisation;
    };

export default function ProjectOrganisationsBoardActionItems({
  data,
  onDelete,
  t,
  ...restProps
}: ProjectOrganisationsBoardActionItemsProps) {
  return (
    <>
      <KanbanBoardActionsMenuItems {...restProps} t={t} />
      <ProjectOrganisationsListActionMenuItems
        data={data}
        onDelete={onDelete}
        t={t}
      />
    </>
  );
}
