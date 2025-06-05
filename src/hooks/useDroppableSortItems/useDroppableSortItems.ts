import { DndItems, DragUpdateEvent, DragUpdateEventArgs } from "@/types/dnd";
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useRef } from "react";
import { findContainer, findItem, findItemIndex } from "../../utils/dnd";

export interface UseDroppableSortItemsProps<T> {
  onDragStart?: (e: DragStartEvent, data: DragUpdateEventArgs<T>) => void;
  onDragEnd?: (e: DragEndEvent, data: DragUpdateEventArgs<T>) => void;
  onDragOver?: (e: DragOverEvent, data: DragUpdateEventArgs<T>) => void;
  onDragUpdate?: (e: DragUpdateEvent, data: DragUpdateEventArgs<T>) => void;
}

export interface UseDroppableSortItemsFnOptions<T> {
  setState: (state: DndItems<T>) => void;
  isAllowed: (e: DragUpdateEvent, data: DragUpdateEventArgs<T>) => boolean;
}

export default function useDroppableSortItems<T>({
  onDragEnd,
  onDragOver,
  onDragUpdate,
  onDragStart,
}: UseDroppableSortItemsProps<T>) {
  const initialArgs = useRef<{
    item: T;
    itemIndex: number;
    containerId: UniqueIdentifier;
  }>();

  const handleSort = (
    e: DragEndEvent,
    items: DndItems<T>,
    options: UseDroppableSortItemsFnOptions<T>
  ) => {
    const { over, active } = e;
    const { setState, isAllowed } = options;

    if (!over?.id) return;

    const overContainer = findContainer(over.id, items);
    const activeContainer = findContainer(active.id, items);

    if (overContainer && activeContainer && over?.id) {
      const activeIndex = findItemIndex(activeContainer, active.id, items);
      const activeItem = findItem(active.id, items);
      const overIndex = findItemIndex(overContainer, over.id, items);

      if (activeIndex !== overIndex) {
        if (
          isAllowed(e, {
            containerId: overContainer,
            initial: initialArgs.current,
          })
        ) {
          const state = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            ),
          } as DndItems<T>;

          setState(state);

          const eventArgs = {
            containerId: overContainer,
            item: activeItem,
            itemIndex: overIndex,
            state,
            initial: initialArgs.current,
          };

          onDragEnd?.(e, eventArgs);
          onDragUpdate?.(e, eventArgs);
        } else {
          const initialContainerItems = [
            ...items[initialArgs.current?.containerId],
            initialArgs.current?.item,
          ];

          const state = {
            ...items,
            [overContainer]: items[overContainer].filter(
              item => item.id !== initialArgs.current?.item.id
            ),
            [initialArgs.current?.containerId]: arrayMove(
              initialContainerItems,
              initialContainerItems.length - 1,
              initialArgs.current?.itemIndex
            ),
          } as DndItems<T>;

          setState(state);

          onDragEnd?.(e, eventArgs);
        }
      }
    }
  };

  const handleDragSort = (
    e: DragEndEvent,
    items: DndItems<T>,
    options: UseDroppableSortItemsFnOptions<T>
  ) => {
    const { over, active } = e;
    const overId = over?.id;
    const { setState, isAllowed } = options;

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
      const activeItem = findItem(active.id, items);

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
          {
            ...items[activeContainer][activeIndex],
            isDroppable: isAllowed(e, {
              containerId: overContainer,
              initial: initialArgs.current,
            }),
          },
          ...items[overContainer].slice(newIndex, items[overContainer].length),
        ],
      } as DndItems<T>;

      setState(state);

      const eventArgs = {
        containerId: overContainer,
        item: activeItem,
        itemIndex: newIndex,
        state,
        initial: initialArgs.current,
      };

      onDragOver?.(e, eventArgs);
      onDragUpdate?.(e, eventArgs);
    }
  };

  const handleDragSortStart = (e: DragStartEvent, items: DndItems<T>) => {
    const activeContainer = findContainer(e.active.id, items);
    const activeItem = findItem(e.active.id, items);
    const activeItemIndex = findItemIndex(activeContainer, e.active.id, items);

    initialArgs.current = {
      containerId: activeContainer,
      item: activeItem,
      itemIndex: activeItemIndex,
    };

    onDragStart?.(e, {
      initial: initialArgs.current,
    });

    return initialArgs.current;
  };

  return useMemo(
    () => ({
      handleSort,
      handleDragSort,
      handleDragSortStart,
    }),
    [onDragEnd, onDragOver]
  );
}
