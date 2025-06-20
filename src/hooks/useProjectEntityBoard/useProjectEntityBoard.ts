import { WorkflowTransitionsResponse } from "@/services/custodian_approvals";
import { WithModelState } from "@/types/application";
import { DragUpdateEventArgs } from "@/types/dnd";
import { getItemsByTransitions, isTransitionAllowed } from "@/utils/dnd";
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
  const itemsByTransitions = useMemo(
    () => getItemsByTransitions(stateWorkflow, data),
    [stateWorkflow?.data, data]
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
