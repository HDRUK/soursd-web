"use client";

import KanbanBoardOrganisationsCard, {
  KanbanBoardOrganisationsCardProps,
} from "@/modules/KanbanBoard/KanbanBoardOrganisationsCard";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import KanbanBoard, {
  KanbanBoardEntityProps,
  KanbanBoardHelperProps,
} from "../../modules/KanbanBoard";
import { CustodianProjectOrganisation } from "../../types/application";

const NAMESPACE_TRANSLATION = "Application.Status";

type ProjectOrganisationsBoardProps<T = CustodianProjectOrganisation> =
  KanbanBoardEntityProps<T>;

export default function ProjectOrganisationsBoard({
  itemsByTransitions,
  onMove,
  routes,
  updateQueryState,
  options,
  actions,
}: ProjectOrganisationsBoardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const cardComponent = useCallback(
    (props: KanbanBoardOrganisationsCardProps) => {
      return <KanbanBoardOrganisationsCard {...props} routes={routes} />;
    },
    []
  );

  const cardActionsComponent = useCallback(
    (props: KanbanBoardHelperProps<CustodianProjectOrganisation>) => {
      return props.data && actions && actions(props);
    },
    []
  );

  const handleMove = useCallback(
    (
      _: DragUpdateEvent,
      data: DragUpdateEventArgs<CustodianProjectOrganisation>
    ) => {
      if (!data.item || !data.containerId) return;

      onMove(data.item.id, data.containerId as string);
    },
    []
  );

  return (
    <KanbanBoard<CustodianProjectOrganisation>
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
