import { UseDroppableSortItemsFnOptions } from "@/hooks/useDroppableSortItems";
import KanbanBoardUsersCard from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import { getProjectUsersWorkflowQuery } from "@/services/custodian_approvals";
import { DndItems, DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import putUserStatusQuery from "@/services/custodian_approvals/putUserStatusQuery";
import KanbanBoard from "../../modules/KanbanBoard";
import { ProjectAllUser } from "../../types/application";
import useQueryAlerts from "@/hooks/useQueryAlerts";

const NAMESPACE_TRANSLATION_APPLICATION = "Kanban";

interface ProjectUsersBoardProps {
  custodianId: number;
  users: ProjectAllUser[];
}

export default function ProjectUsersBoard({
  custodianId,
  users,
}: ProjectUsersBoardProps) {
  const t = useTranslations(NAMESPACE_TRANSLATION_APPLICATION);
  const { mutateAsync: updateUserStatus, ...restUpdateState } =
    useMutation(putUserStatusQuery());

  const { data: stateWorkflow } = useQuery(getProjectUsersWorkflowQuery());

  const initialData = useMemo(() => {
    if (stateWorkflow?.data && users) {
      const data: DndItems<ProjectAllUser> = {};

      Object.keys(stateWorkflow?.data).forEach((key: string) => {
        data[key] = [];
      });

      users.forEach(user => {
        data[user.model_state.state.slug].push(user.project_has_user);
      });

      return data;
    }

    return null;
  }, [stateWorkflow?.data, users]);

  useQueryAlerts(restUpdateState);

  const droppableFnOptions = useMemo<
    Partial<UseDroppableSortItemsFnOptions<ProjectAllUser>>
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
      { containerId, item }: DragUpdateEventArgs<ProjectAllUser>
    ) => {
      updateUserStatus({
        params: {
          custodianId,
          id: item.id,
        },
        payload: {
          status: containerId,
        },
      });
    },
    []
  );

  const { isError, isSuccess } = restUpdateState;

  return (
    stateWorkflow?.data &&
    initialData && (
      <KanbanBoard<ProjectAllUser>
        t={t}
        cardComponent={KanbanBoardUsersCard}
        initialData={initialData}
        stateWorkflow={stateWorkflow.data}
        strategy={rectSortingStrategy}
        onDragEnd={handleUpdateSafePeople}
        onMove={handleUpdateSafePeople}
        queryState={{ isError, isSuccess }}
        droppableFnOptions={droppableFnOptions}
      />
    )
  );
}
