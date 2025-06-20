"use client";

import { ActionMenu } from "@/components/ActionMenu";
import useProjectEntityBoard from "@/hooks/useProjectEntityBoard";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import KanbanBoardOrganisationsCard, {
  KanbanBoardOrganisationsCardProps,
} from "@/modules/KanbanBoard/KanbanBoardOrganisationsCard";
import {
  getCustodianProjectOrganisationWorkflowTransitionsQuery,
  putCustodianProjectOrganisationQuery,
} from "@/services/custodian_approvals";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import KanbanBoard, { KanbanBoardHelperProps } from "../../modules/KanbanBoard";
import {
  CustodianProjectOrganisation,
  WithRoutes,
} from "../../types/application";
import ProjectOrganisationsBoardActionItems from "./ProjectOrganisationsBoardActionItems";

const NAMESPACE_TRANSLATION = "Projects.Organisations";

type ProjectOrganisationsBoardProps = WithRoutes<{
  custodianId: number;
  custodianProjectOrganisations: CustodianProjectOrganisation[];
  onDelete: () => void;
}>;

export default function ProjectOrganisationsBoard({
  custodianId,
  custodianProjectOrganisations,
  routes,
  onDelete,
}: ProjectOrganisationsBoardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const {
    mutateAsync: changeValidationStatus,
    ...updateValidationMutationState
  } = useMutation(putCustodianProjectOrganisationQuery(custodianId));

  const { isError, isSuccess, reset } = updateValidationMutationState;

  const { data: stateWorkflow } = useQuery(
    getCustodianProjectOrganisationWorkflowTransitionsQuery()
  );

  const { itemsByTransitions, droppableFnOptions } = useProjectEntityBoard({
    data: custodianProjectOrganisations,
    stateWorkflow: stateWorkflow?.data,
  });

  useQueryAlerts(updateValidationMutationState, {
    showOnlyError: true,
  });

  const handleUpdateSafePeople = useCallback(
    (
      _: DragUpdateEvent,
      { containerId, item }: DragUpdateEventArgs<CustodianProjectOrganisation>
    ) => {
      if (containerId && item?.id) {
        changeValidationStatus({
          params: {
            projectOrganisationId: item.id,
          },
          payload: {
            status: containerId,
            comment: "drag change",
          },
        });
      }
    },
    []
  );

  const cardComponent = useCallback(
    (props: KanbanBoardOrganisationsCardProps) => {
      return <KanbanBoardOrganisationsCard {...props} routes={routes} />;
    },
    []
  );

  const cardActionsComponent = useCallback(
    (props: KanbanBoardHelperProps<CustodianProjectOrganisation>) => {
      return (
        props.data && (
          <ActionMenu>
            {({ handleClose }) => (
              <ProjectOrganisationsBoardActionItems
                handleClose={handleClose}
                onDelete={onDelete}
                {...props}
                t={t}
              />
            )}
          </ActionMenu>
        )
      );
    },
    []
  );

  return (
    itemsByTransitions && (
      <KanbanBoard<CustodianProjectOrganisation>
        t={t}
        cardActionsComponent={cardActionsComponent}
        cardComponent={cardComponent}
        initialData={itemsByTransitions}
        strategy={rectSortingStrategy}
        onDragEnd={handleUpdateSafePeople}
        onMove={handleUpdateSafePeople}
        droppableFnOptions={droppableFnOptions}
        queryState={{ isError, isSuccess, reset }}
      />
    )
  );
}
