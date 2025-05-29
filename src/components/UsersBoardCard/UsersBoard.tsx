import {
  CancelDrop,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  KeyboardCoordinateGetter,
  KeyboardSensor,
  MeasuringStrategy,
  Modifiers,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  SortingStrategy,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";

import { Box } from "@mui/system";
import DndItem from "../DndItem";

import { ProjectAllUser } from "../../types/application";
import DndDroppableContainer from "../DndDroppableContainer";
import DndSortableItem from "../DndSortableItem";
import UsersBoardCard from "./UsersBoardCard";
import UsersBoardColumn from "./UsersBoardColumn";
import {
  columnsCoordinateGetter,
  findContainer,
  findItem,
  findItemIndex,
  getIndex,
} from "./utils";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

type Items = Record<UniqueIdentifier, ProjectAllUser[]>;

interface UsersBoardProps {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  renderItem?: any;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  scrollable?: boolean;
  vertical?: boolean;
  initialData: Items;
}

const PLACEHOLDER_ID = "placeholder";

export default function UsersBoard({
  adjustScale = false,
  cancelDrop,
  initialData,
  coordinateGetter = columnsCoordinateGetter,
  modifiers,
  strategy = verticalListSortingStrategy,
  vertical = false,
}: UsersBoardProps) {
  const [items, setItems] = useState(initialData);
  const [containers] = useState(Object.keys(items) as UniqueIdentifier[]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  // const lastContainerId = useRef<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const [clonedItems, setClonedItems] = useState<Items | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const handleDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    if (!over?.id) {
      setActiveId(null);
      return;
    }

    const overContainer = findContainer(over.id, items);
    const activeContainer = findContainer(active.id, items);

    if (overContainer && activeContainer && over?.id) {
      const activeIndex = findItemIndex(activeContainer, active.id, items);
      const overIndex = findItemIndex(overContainer, over.id, items);

      if (activeIndex !== overIndex) {
        setItems(items => ({
          ...items,
          [overContainer]: arrayMove(
            items[overContainer],
            activeIndex,
            overIndex
          ),
        }));
      }
    }

    setActiveId(null);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
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
      setItems(items => {
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
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;

          const modifier = isBelowOverItem ? 1 : 0;

          newIndex =
            overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        recentlyMovedToNewContainer.current = true;

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter(
            item => item.id !== active.id
          ),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ],
        };
      });
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

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
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      cancelDrop={cancelDrop}
      onDragCancel={handleDragCancel}
      modifiers={modifiers}>
      <Box
        sx={{
          display: "inline-grid",
          boxSizing: "border-box",
          gridAutoFlow: "column",
          gap: 2,
        }}>
        {containers.map(containerId => (
          <DndDroppableContainer key={containerId} id={containerId}>
            <SortableContext items={items[containerId]} strategy={strategy}>
              <UsersBoardColumn
                heading={`${containerId} (${items[containerId].length})`}
                sx={{
                  height: "100vh",
                  width: "236px",
                }}>
                {items[containerId].map(user => {
                  return (
                    <DndSortableItem
                      disabled={isSortingContainer}
                      key={user.id}
                      id={user.id}
                      index={findItemIndex(containerId, user.id, items)}>
                      <UsersBoardCard user={user} sx={{ width: "220px" }} />
                    </DndSortableItem>
                  );
                })}
              </UsersBoardColumn>
            </SortableContext>
          </DndDroppableContainer>
        ))}
      </Box>
      BLAH: {JSON.stringify(activeId)}
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

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    console.log("ACTIVE ID", id);
    const user = findItem(id, items);

    return (
      user && (
        <DndItem value={id} dragOverlay>
          <UsersBoardCard user={user} sx={{ width: "220px" }} />
        </DndItem>
      )
    );
  }

  function getNextContainerId() {
    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  }
}
