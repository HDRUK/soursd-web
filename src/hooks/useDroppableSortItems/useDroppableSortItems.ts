import { DragEndEvent, Over, UniqueIdentifier } from "@dnd-kit/core";
import { findContainer, findItemIndex } from "../../utils/dnd";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";

export interface UseDroppableSortItemsProps {
  onDrop?: (containerId: UniqueIdentifier, item: Over) => void;
  onDragOver?: <T>(containerId: UniqueIdentifier, items: T) => void;
}

export default function useDroppableSortItems({
  onDrop,
  onDragOver,
}: UseDroppableSortItemsProps) {
  const handleSort = <T extends { id: UniqueIdentifier }>(
    e: DragEndEvent,
    items: Record<string, T[]>,
    callback: (state: Record<string, T[]>) => void
  ) => {
    const { over, active } = e;

    if (!over?.id) return;

    const overContainer = findContainer(over.id, items);
    const activeContainer = findContainer(active.id, items);

    if (overContainer && activeContainer && over?.id) {
      const activeIndex = findItemIndex(activeContainer, active.id, items);
      const overIndex = findItemIndex(overContainer, over.id, items);

      if (activeIndex !== overIndex) {
        callback({
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        });

        onDrop?.(overContainer, over);
      }
    }
  };

  const handleDragSort = <T extends { id: UniqueIdentifier }>(
    e: DragEndEvent,
    items: Record<string, T[]>,
    callback: (state: Record<string, T[]>) => void
  ) => {
    const { over, active } = e;
    const overId = over?.id;

    if (overId == null || active.id in items) {
      return;
    }

    const overContainer = findContainer(overId, items);
    const activeContainer = findContainer(active.id, items);

    if (!overContainer || !activeContainer) {
      return;
    }

    if (activeContainer !== overContainer) {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];
      const overIndex = overItems.findIndex(({ id }) => id === overId);
      const activeIndex = activeItems.findIndex(({ id }) => id === active.id);

      let newIndex: number;

      if (overId in items) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      const state = {
        ...items,
        [activeContainer]: items[activeContainer].filter(
          item => item.id !== active.id
        ),
        [overContainer]: [
          ...items[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...items[overContainer].slice(newIndex, items[overContainer].length),
        ],
      };

      callback(state);

      onDragOver?.(overContainer, state);
    }
  };

  return useMemo(
    () => ({
      handleSort,
      handleDragSort,
    }),
    [onDrop]
  );
}
