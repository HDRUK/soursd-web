"use client";

import { ActionMenu } from "@/components/ActionMenu";
import { UseDroppableSortItemsFnOptions } from "@/hooks/useDroppableSortItems";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import KanbanBoardOrganisationsCard, {
  KanbanBoardOrganisationsCardProps,
} from "@/modules/KanbanBoard/KanbanBoardOrganisationsCard";
import {
  getCustodianProjectOrganisationWorkflowTransitionsQuery,
  putCustodianProjectOrganisationQuery,
} from "@/services/custodian_approvals";
import { DndItems, DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import KanbanBoard, { KanbanBoardHelperProps } from "../../modules/KanbanBoard";
import {
  CustodianProjectOrganisation,
  ProjectOrganisation,
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

  const initialData = useMemo(() => {
    if (stateWorkflow?.data && custodianProjectOrganisations) {
      const data: DndItems<ProjectOrganisation> = {};

      Object.keys(stateWorkflow?.data).forEach((key: string) => {
        data[key] = [];
      });

      custodianProjectOrganisations.forEach(user => {
        data[user.model_state.state.slug].push(user.project_organisation);
      });

      return data;
    }

    return null;
  }, [stateWorkflow?.data, custodianProjectOrganisations]);

  useQueryAlerts(updateValidationMutationState, {
    showOnlyError: true,
  });

  const droppableFnOptions = useMemo<
    Partial<UseDroppableSortItemsFnOptions<ProjectOrganisation>>
  >(
    () => ({
      isAllowed: (
        _,
        { initial, containerId }: DragUpdateEventArgs<ProjectOrganisation>
      ) => {
        return process.env.NEXT_PUBLIC_FEATURE_PROJECT_USERS_WORKFLOW === "true"
          ? !!(
              initial.containerId === containerId ||
              stateWorkflow?.data[initial.containerId]?.includes(containerId)
            )
          : true;
      },
    }),
    [stateWorkflow]
  );

  const handleUpdateSafePeople = useCallback(
    (
      _: DragUpdateEvent,
      { containerId, item }: DragUpdateEventArgs<ProjectOrganisation>
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
    (props: KanbanBoardHelperProps<ProjectOrganisation>) => {
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
    stateWorkflow &&
    initialData && (
      <KanbanBoard<ProjectOrganisation>
        t={t}
        cardActionsComponent={cardActionsComponent}
        cardComponent={cardComponent}
        initialData={initialData}
        strategy={rectSortingStrategy}
        onDragEnd={handleUpdateSafePeople}
        onMove={handleUpdateSafePeople}
        droppableFnOptions={droppableFnOptions}
        queryState={{ isError, isSuccess, reset }}
      />
    )
  );
}
