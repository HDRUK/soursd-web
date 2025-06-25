"use client";

import KanbanBoardOrganisationsCard, {
  KanbanBoardOrganisationsCardProps,
} from "@/modules/KanbanBoard/KanbanBoardOrganisationsCard";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import KanbanBoard, { KanbanBoardHelperProps } from "../../modules/KanbanBoard";
import {
  CustodianProjectOrganisation,
  ProjectBoard,
} from "../../types/application";

const NAMESPACE_TRANSLATION = "Projects.Organisations";

type ProjectOrganisationsBoardProps<T = CustodianProjectOrganisation> =
  ProjectBoard<T>;

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
