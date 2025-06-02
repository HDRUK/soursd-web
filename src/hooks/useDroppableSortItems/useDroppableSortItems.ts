import { DndItems } from "@/types/dnd";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { findContainer, findItemIndex } from "../../utils/dnd";

export type Items<T> = Record<
  UniqueIdentifier,
  T & {
    id: UniqueIdentifier;
  }
>;

export interface UseDroppableSortItemsProps<T> {
  onDragEnd?: (containerId: UniqueIdentifier, items: DndItems<T>) => void;
  onDragOver?: (containerId: UniqueIdentifier, items: DndItems<T>) => void;
}

export default function useDroppableSortItems<T>({
  onDragEnd,
  onDragOver,
}: UseDroppableSortItemsProps<T>) {
  const handleSort = (
    e: DragEndEvent,
    items: DndItems<T>,
    callback: (state: DndItems<T>) => void
  ) => {
    const { over, active } = e;

    if (!over?.id) return;

    const overContainer = findContainer(over.id, items);
    const activeContainer = findContainer(active.id, items);

    if (overContainer && activeContainer && over?.id) {
      const activeIndex = findItemIndex(activeContainer, active.id, items);
      const overIndex = findItemIndex(overContainer, over.id, items);

      if (activeIndex !== overIndex) {
        const state = {
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        } as DndItems<T>;

        callback(state);

        onDragEnd?.(overContainer, state);
      }
    }
  };

  const handleDragSort = (
    e: DragEndEvent,
    items: DndItems<T>,
    callback: (state: DndItems<T>) => void
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
      } as DndItems<T>;

      callback(state);

      onDragOver?.(overContainer, state);
    }
  };

  return useMemo(
    () => ({
      handleSort,
      handleDragSort,
    }),
    [onDragEnd, onDragOver]
  );
}
