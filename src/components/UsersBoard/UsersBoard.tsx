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
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

import { Box } from "@mui/system";
import DndItem from "../DndItem";

import { dndDragRotate } from "../../consts/styles";
import { ProjectAllUser } from "../../types/application";
import DndDroppableContainer from "../DndDroppableContainer";
import DndSortableItem from "../DndSortableItem";
import UsersBoardCard from "./UsersBoardCard";
import UsersBoardColumn from "./UsersBoardColumn";
import { findContainer, findItem, findItemIndex } from "./utils";
import { ActionMenu } from "../ActionMenu";

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
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  initialData: Items;
}

export default function UsersBoard({
  adjustScale = false,
  cancelDrop,
  initialData,
  modifiers,
  strategy = verticalListSortingStrategy,
}: UsersBoardProps) {
  const [items, setItems] = useState(initialData);
  const [containers] = useState(Object.keys(items) as UniqueIdentifier[]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const [clonedItems, setClonedItems] = useState<Items | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  const handleDragEnd = ({ over, active }: DragEndEvent) => {
    //wait
    unstable_batchedUpdates(() => {
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
          console.log("UPDATING ITEMS");
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
    });
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    console.log({ active, over });
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
        console.log("Updating items", items);
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
                dragOver={
                  activeId && findItemIndex(containerId, activeId, items) > -1
                }
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
                      <UsersBoardCard
                        user={user}
                        sx={{ width: "220px" }}
                        actions={<ActionMenu>Move to </ActionMenu>}
                      />
                    </DndSortableItem>
                  );
                })}
              </UsersBoardColumn>
            </SortableContext>
          </DndDroppableContainer>
        ))}
      </Box>
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
    const user = findItem(id, items);

    return (
      user && (
        <DndItem dragOverlay>
          <UsersBoardCard
            user={user}
            sx={{
              width: "220px",
              backgroundColor: "neutralPink.main",
              ...dndDragRotate,
            }}
          />
        </DndItem>
      )
    );
  }
}
