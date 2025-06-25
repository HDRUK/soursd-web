import { ActionMenu } from "@/components/ActionMenu";
import KanbanBoardActionsMenuItems from "@/modules/KanbanBoard/KanbanBoardActionMenuItems";
import {
  CustodianProjectOrganisation,
  WithTranslations,
} from "@/types/application";

type ProjectOrganisationsActionsProps<T = CustodianProjectOrganisation> =
  WithTranslations<{
    data: T;
    onMoveClick: (id: number, status: string) => void;
    allowedTransitions: string[];
  }>;

export default function ProjectOrganisationsActions({
  onMoveClick,
  allowedTransitions,
  data,
  ...restProps
}: ProjectOrganisationsActionsProps) {
  return (
    <ActionMenu>
      {({ handleClose }) => (
        <KanbanBoardActionsMenuItems
          onMoveClick={(id: number, status: string) => {
            onMoveClick(id, status);

            handleClose();
          }}
          allowedTransitions={allowedTransitions}
          data={data}
          handleClose={handleClose}
          {...restProps}
        />
      )}
    </ActionMenu>
  );
}
