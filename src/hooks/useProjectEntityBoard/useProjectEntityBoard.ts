import { WorkflowTransitionsResponse } from "@/services/custodian_approvals";
import { WithModelState } from "@/types/application";
import { DndItems, DragUpdateEventArgs } from "@/types/dnd";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useMemo } from "react";
import { UseDroppableSortItemsFnOptions } from "../useDroppableSortItems";

interface UseProjectEntityBoardProps<T> {
  data: T[];
  stateWorkflow: WorkflowTransitionsResponse | undefined;
}

export default function useProjectEntityBoard<
  T extends WithModelState<{
    id: UniqueIdentifier;
  }>,
>({ data, stateWorkflow }: UseProjectEntityBoardProps<T>) {
  function isTransitionAllowed<T>(
    stateWorkflow: WorkflowTransitionsResponse | undefined,
    { initial, containerId }: DragUpdateEventArgs<T>
  ) {
    return process.env.NEXT_PUBLIC_FEATURE_PROJECT_USERS_WORKFLOW === "true"
      ? !!(
          stateWorkflow &&
          initial?.containerId &&
          containerId &&
          (initial.containerId === containerId ||
            stateWorkflow[initial.containerId].includes(containerId))
        )
      : true;
  }

  function getItemsByTransitions<
    T extends WithModelState<{ id: UniqueIdentifier }>,
  >(
    stateWorkflow: WorkflowTransitionsResponse | undefined,
    data: T[] | undefined
  ): DndItems<T> | null {
    if (stateWorkflow && data?.length) {
      const items: DndItems<T> = {};

      Object.keys(stateWorkflow).forEach((key: string) => {
        items[key] = [];
      });

      data.forEach(item => {
        items[item.model_state.state.slug].push(item);
      });

      return items;
    }

    return null;
  }

  const itemsByTransitions = useMemo(
    () => getItemsByTransitions(stateWorkflow, data),
    [stateWorkflow, data]
  );

  const droppableFnOptions = useMemo<
    Partial<UseDroppableSortItemsFnOptions<T>>
  >(
    () => ({
      isTransitionAllowed: (_, options: DragUpdateEventArgs<T>) =>
        isTransitionAllowed(stateWorkflow, options),
    }),
    [stateWorkflow]
  );

  return {
    itemsByTransitions,
    droppableFnOptions,
  };
}
