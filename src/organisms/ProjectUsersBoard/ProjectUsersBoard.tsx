import { UseDroppableSortItemsFnOptions } from "@/hooks/useDroppableSortItems";
import KanbanBoardUsersCard from "@/modules/KanbanBoard/KanbanBoardUsersCard";
import { DndItems, DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import useProjectUserCustodianApproval from "@/hooks/useProjectUserCustodianApproval";
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

  const { data: statusOptionsData } = useQuery({
    queryKey: ["custodianApprovalStates"],
    queryFn: () =>
      projectUserCustodianStates({
        error: { message: "fetchStatesError" },
      }),
  });
  const { mutateAsync: changeValidationStatus, isPending: isUpdating } =
    useMutation({
      mutationFn: ({ params, payload }) =>
        projectUserCustodianApproval(
          "PUT",
          custodianId,
          params.projectUserId,
          payload,
          {
            error: { message: "changeValidationStatusError" },
          }
        ),
      //onSuccess,
    });

  const stateWorkflow = statusOptionsData?.data;

  const initialData = useMemo(() => {
    if (!stateWorkflow || !custodianProjectUsers) return null;

    const data = Object.fromEntries(
      stateWorkflow.map(state => [state, []])
    ) as DndItems<ProjectUser>;

    custodianProjectUsers.forEach(
      ({
        model_state: {
          state: { slug },
        },
        project_has_user,
      }) => {
        data[slug].push(project_has_user);
      }
    );

    return data;
  }, [stateWorkflow, custodianProjectUsers]);

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
      console.log("here!!!");
      changeValidationStatus({
        params: {
          projectUserId: item.id,
        },
        payload: {
          status: containerId,
          comment: "drag change",
        },
      });
    },
    []
  );

  return (
    stateWorkflow &&
    initialData && (
      <KanbanBoard<CustodianProjectUser>
        t={t}
        cardComponent={KanbanBoardUsersCard}
        initialData={initialData}
        stateWorkflow={stateWorkflow.data}
        strategy={rectSortingStrategy}
        onDragUpdate={handleUpdateSafePeople}
        onMove={handleUpdateSafePeople}
        droppableFnOptions={droppableFnOptions}
      />
    )
  );
}
