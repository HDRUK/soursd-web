"use client";

import { ActionMenu } from "@/components/ActionMenu";
import useProjectEntityBoard from "@/hooks/useProjectEntityBoard";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import KanbanBoardUsersCard, {
  KanbanBoardUsersCardProps,
} from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import {
  getCustodianProjectUserWorkflowTransitionsQuery,
  putCustodianProjectUserQuery,
} from "@/services/custodian_approvals";
import { DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import KanbanBoard, { KanbanBoardHelperProps } from "../../modules/KanbanBoard";
import { CustodianProjectUser, WithRoutes } from "../../types/application";
import ProjectUsersBoardActionItems from "./ProjectUsersBoardActionItems";

const NAMESPACE_TRANSLATION = "Projects.Users";

type CustodianProjectUsersBoardProps = WithRoutes<{
  custodianId: number;
  custodianProjectUsers: CustodianProjectUser[];
  onDelete: () => void;
  onPrimaryContactChange: () => void;
}>;

export default function CustodianProjectUsersBoard({
  custodianId,
  custodianProjectUsers,
  routes,
  onDelete,
  onPrimaryContactChange,
}: CustodianProjectUsersBoardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION);

  const {
    mutateAsync: changeValidationStatus,
    ...updateValidationMutationState
  } = useMutation(putCustodianProjectUserQuery(custodianId));

  const { isError, isSuccess, reset } = updateValidationMutationState;

  const { data: stateWorkflow } = useQuery(
    getCustodianProjectUserWorkflowTransitionsQuery()
  );

  const { itemsByTransitions, droppableFnOptions } = useProjectEntityBoard({
    data: custodianProjectUsers,
    stateWorkflow: stateWorkflow?.data,
  });

  useQueryAlerts(updateValidationMutationState, {
    showOnlyError: true,
  });

  const handleUpdateSafePeople = useCallback(
    (
      _: DragUpdateEvent,
      { containerId, item }: DragUpdateEventArgs<CustodianProjectUser>
    ) => {
      if (containerId && item?.id) {
        changeValidationStatus({
          params: {
            projectUserId: item.id,
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

  const cardComponent = useCallback((props: KanbanBoardUsersCardProps) => {
    return <KanbanBoardUsersCard {...props} routes={routes} />;
  }, []);

  const cardActionsComponent = useCallback(
    (props: KanbanBoardHelperProps<CustodianProjectUser>) => {
      return (
        props.data && (
          <ActionMenu>
            {({ handleClose }) => (
              <ProjectUsersBoardActionItems
                handleClose={handleClose}
                onDelete={onDelete}
                onPrimaryContactChange={onPrimaryContactChange}
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
      <KanbanBoard<CustodianProjectUser>
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
