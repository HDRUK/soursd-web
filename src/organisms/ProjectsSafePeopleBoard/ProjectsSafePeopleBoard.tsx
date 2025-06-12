import {
  mockedKanbanProjectUser,
  mockedProjectStateWorkflow,
} from "@/mocks/data/project";
import KanbanBoardUsersCard from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useCallback } from "react";
import KanbanBoard from "../../modules/KanbanBoard";
import { ProjectAllUser } from "../../types/application";
import { useTranslations } from "next-intl";

export default function ProjectsSafePeopleBoard() {
  const t = useTranslations("temp");
  // const { mutateAsync: updateUserCard } =
  //   useMutation(putProjectUserPrimaryContactQuery());

  const handleUpdateSafePeople = useCallback(
    (
      e: DragUpdateEvent,
      { containerId, item, state }: DragUpdateEventArgs<ProjectAllUser>
    ) => {
      console.log(e, containerId, item, state);
      // updateUserCard();
    },
    []
  );

  return (
    <KanbanBoard<ProjectAllUser>
      cardComponent={KanbanBoardUsersCard}
      initialData={mockedKanbanProjectUser()}
      stateWorkflow={mockedProjectStateWorkflow()}
      strategy={rectSortingStrategy}
      onDragUpdate={handleUpdateSafePeople}
      t={t}
    />
  );
}
