"use client";

import { ActionMenu } from "@/components/ActionMenu";
import { UseDroppableSortItemsFnOptions } from "@/hooks/useDroppableSortItems";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import KanbanBoardActionsMenuItems, {
  KanbanBoardActionsMenuItemsProps,
} from "@/modules/KanbanBoard/KanbanBoardActionMenuItems";
import KanbanBoardUsersCard, {
  KanbanBoardUsersCardProps,
} from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import {
  getCustodianProjectUserWorkflowTransitionsQuery,
  putCustodianProjectUserQuery,
} from "@/services/custodian_approvals";
import { DndItems, DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ReactNode, useCallback, useMemo } from "react";
import KanbanBoard from "../../modules/KanbanBoard";
import {
  CustodianProjectUser,
  ProjectUser,
  WithRoutes,
} from "../../types/application";
import ProjectUsersActionItems from "./ProjectUsersActionItems";
import ProjectUsersListActionMenuItems from "../ProjectUsersList/ProjectUsersListActionMenuItems";

const NAMESPACE_TRANSLATION_KANBAN = "Kanban";

type ProjectUsersBoardProps = WithRoutes<{
  custodianId: number;
  custodianProjectUsers: CustodianProjectUser[];
  userActions: (data: CustodianProjectUser) => ReactNode;
}>;

export default function ProjectUsersBoard({
  custodianId,
  custodianProjectUsers,
  routes,
  userActions,
}: ProjectUsersBoardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_KANBAN);

  const {
    mutateAsync: changeValidationStatus,
    ...updateValidationMutationState
  } = useMutation(putCustodianProjectUserQuery(custodianId));

  const { isError, isSuccess, reset } = updateValidationMutationState;

  const { data: stateWorkflow } = useQuery(
    getCustodianProjectUserWorkflowTransitionsQuery()
  );

  const initialData = useMemo(() => {
    if (stateWorkflow?.data && custodianProjectUsers) {
      const data: DndItems<ProjectUser> = {};

      Object.keys(stateWorkflow?.data).forEach((key: string) => {
        data[key] = [];
      });

      custodianProjectUsers.forEach(user => {
        data[user.model_state.state.slug].push(user.project_has_user);
      });

      return data;
    }

    return null;
  }, [stateWorkflow?.data, custodianProjectUsers]);

  useQueryAlerts(updateValidationMutationState, {
    showOnlyError: true,
  });

  const droppableFnOptions = useMemo<
    Partial<UseDroppableSortItemsFnOptions<ProjectUser>>
  >(
    () => ({
      isAllowed: (
        _,
        { initial, containerId }: DragUpdateEventArgs<ProjectUser>
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
      { containerId, item }: DragUpdateEventArgs<ProjectUser>
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
    ({ data, ...restProps }: KanbanBoardActionsMenuItemsProps) => {
      return (
        <ActionMenu>
          <ProjectUsersListActionMenuItems {...restProps} t={t} />
        </ActionMenu>
      );
    },
    []
  );

  return (
    stateWorkflow &&
    initialData && (
      <KanbanBoard<ProjectUser>
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
