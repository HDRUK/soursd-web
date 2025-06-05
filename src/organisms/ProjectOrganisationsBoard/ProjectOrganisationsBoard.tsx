import { mockedKanbanProjectUser } from "@/mocks/data/project";
import { mockedProjectStateWorkflow } from "@/mocks/data/project";
import KanbanBoardUsersCard from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useCallback } from "react";
import KanbanBoard from "../../modules/KanbanBoard";
import { ProjectAllUser } from "../../types/application";

export default function ProjectOrganisationsBoard() {
  // const { mutateAsync: updateUserCard } =
  //   useMutation(putProjectUserPrimaryContactQuery());


  {
    stateWorkflow: {
      transitions: {

      }
    },
    data: {}
  }

  const handleUpdateState = useCallback(
    (
      e: DragUpdateEvent,
      { containerId, item, state }: DragUpdateEventArgs<ProjectAllUser>
    ) => {
      console.log(e, containerId, item, state);
      //updateUserCard();
    },
    []
  );

  return (
    <KanbanBoard<ProjectAllUser>
      cardComponent={KanbanBoardUsersCard}
      initialData={mockedKanbanProjectUser()}
      stateWorkflow={mockedProjectStateWorkflow}
      strategy={rectSortingStrategy}
      onDragUpdate={handleUpdateState}
    />
  );
}
