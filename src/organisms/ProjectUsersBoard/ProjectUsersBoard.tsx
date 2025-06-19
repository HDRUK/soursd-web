import { UseDroppableSortItemsFnOptions } from "@/hooks/useDroppableSortItems";
import useQueryAlerts from "@/hooks/useQueryAlerts";
import KanbanBoardUsersCard from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import {
  getCustodianProjectUserWorkflowTransitionsQuery,
  putCustodianProjectUserQuery,
} from "@/services/custodian_approvals";
import { DndItems, DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import KanbanBoard from "../../modules/KanbanBoard";
import { CustodianProjectUser, ProjectUser } from "../../types/application";

const NAMESPACE_TRANSLATION_APPLICATION = "Kanban";

interface ProjectUsersBoardProps {
  custodianId: number;
  custodianProjectUsers: CustodianProjectUser[];
}

export default function ProjectUsersBoard({
  custodianId,
  custodianProjectUsers,
}: ProjectUsersBoardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);

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
        { initial, containerId }: DragUpdateEventArgs<ProjectAllUser>
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

  return (
    stateWorkflow &&
    initialData && (
      <KanbanBoard<ProjectUser>
        t={t}
        cardComponent={KanbanBoardUsersCard}
        initialData={initialData}
        strategy={rectSortingStrategy}
        onDragUpdate={handleUpdateSafePeople}
        onMove={handleUpdateSafePeople}
        droppableFnOptions={droppableFnOptions}
        queryState={{ isError, isSuccess, reset }}
      />
    )
  );
}
