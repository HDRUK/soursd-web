import {
  CancelDrop,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  MeasuringStrategy,
  Modifiers,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  SortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentType, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

import DndItem from "../../components/DndItem";

import useDroppableSortItems from "@/hooks/useDroppableSortItems";
import { ActionMenu } from "../../components/ActionMenu";
import DndDroppableContainer from "../../components/DndDroppableContainer";
import DndSortableItem from "../../components/DndSortableItem";
import { dndDragRotate } from "../../consts/styles";
import { findItem, findItemIndex } from "../../utils/dnd";
import KanbanBoardColumn from "./KanbanBoardColumn";
import KanbanBoardColumns from "./KanbanBoardColumns";
import { DndItems } from "@/types/dnd";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

interface KanbanBoardProps<T> {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  initialData: DndItems<T>;
  cardComponent: ComponentType<T>;
  onDragEnd?: (containerId: UniqueIdentifier, items: DndItems<T>) => void;
  onDragOver?: (containerId: UniqueIdentifier, items: DndItems<T>) => void;
}

export default function KanbanBoard<T>({
  adjustScale = false,
  cancelDrop,
  initialData,
  modifiers,
  strategy = verticalListSortingStrategy,
  onDragEnd,
  onDragOver,
  ...restProps
}: KanbanBoardProps<T>) {
  const { handleDragSort, handleSort } = useDroppableSortItems<T>({
    onDragEnd,
    onDragOver,
  });
  const [items, setItems] = useState<DndItems<T>>(initialData);
  const [containers] = useState(Object.keys(items) as UniqueIdentifier[]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const [clonedItems, setClonedItems] = useState<DndItems<T> | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const renderSortableItemDragOverlay = (id: UniqueIdentifier) => {
    const data = findItem(id, items);

    return (
      data && (
        <DndItem dragOverlay>
          <restProps.cardComponent
            data={data}
            sx={{
              width: "220px",
              backgroundColor: "neutralPink.main",
              ...dndDragRotate,
            }}
          />
        </DndItem>
      )
    );
  };

  const handleDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    unstable_batchedUpdates(() => {
      handleSort(e, items, (state: DndItems<T>) => {
        setItems(items => {
          return {
            ...items,
            ...state,
          };
        });
      });

      setActiveId(null);
    });
  };

  const handleDragOver = (e: DragOverEvent) => {
    handleDragSort(e, items, (state: DndItems<T>) => {
      setItems(prevState => ({
        ...prevState,
        ...state,
      }));

      recentlyMovedToNewContainer.current = true;
    });
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  const throttledDragOver = useDebouncedCallback(handleDragOver, 100);

  return (
    <DndContext
      sensors={sensors}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={(e: DragOverEvent) => {
        throttledDragOver(e);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      cancelDrop={cancelDrop}
      modifiers={modifiers}>
      <KanbanBoardColumns>
        {containers.map(containerId => (
          <DndDroppableContainer key={containerId} id={containerId}>
            <SortableContext items={items[containerId]} strategy={strategy}>
              <KanbanBoardColumn
                dragOver={
                  activeId && findItemIndex(containerId, activeId, items) > -1
                }
                heading={`${containerId} (${items[containerId].length})`}
                sx={{
                  height: "100vh",
                  width: "236px",
                }}>
                {items[containerId].map(data => {
                  return (
                    <DndSortableItem
                      disabled={isSortingContainer}
                      key={data.id}
                      id={data.id}
                      index={findItemIndex(containerId, data.id, items)}>
                      <restProps.cardComponent
                        data={data}
                        sx={{ width: "220px" }}
                        actions={<ActionMenu>Move to </ActionMenu>}
                      />
                    </DndSortableItem>
                  );
                })}
              </KanbanBoardColumn>
            </SortableContext>
          </DndDroppableContainer>
        ))}
      </KanbanBoardColumns>
      {createPortal(
        <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
          {activeId &&
            !containers.includes(activeId) &&
            renderSortableItemDragOverlay(activeId)}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
