"use client";

import KanbanBoardUsersCard, {
  KanbanBoardUsersCardProps,
} from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import KanbanBoard, {
  KanbanBoardEntityProps,
  KanbanBoardHelperProps,
} from "../../modules/KanbanBoard";
import { CustodianProjectUser } from "../../types/application";

const NAMESPACE_TRANSLATION = "Projects.Users";

type ProjectUsersProps<T = CustodianProjectUser> = KanbanBoardEntityProps<T>;

export default function ProjectUsers({
  itemsByTransitions,
  onMove,
  routes,
  updateQueryState,
  options,
  actions,
}: ProjectUsersProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const cardComponent = useCallback((props: KanbanBoardUsersCardProps) => {
    return <KanbanBoardUsersCard {...props} routes={routes} />;
  }, []);

  const cardActionsComponent = useCallback(
    (props: KanbanBoardHelperProps<CustodianProjectUser>) => {
      return props.data && actions && actions(props);
    },
    []
  );

  const handleMove = useCallback(
    (_: DragUpdateEvent, data: DragUpdateEventArgs<CustodianProjectUser>) => {
      if (!data.item || !data.containerId) return;

      onMove(data.item.id, data.containerId as string);
    },
    []
  );

  return (
    <KanbanBoard<CustodianProjectUser>
      t={t}
      cardActionsComponent={cardActionsComponent}
      cardComponent={cardComponent}
      initialData={itemsByTransitions}
      strategy={rectSortingStrategy}
      onDragEnd={handleMove}
      onMove={handleMove}
      options={options}
      queryState={updateQueryState}
    />
  );
}
