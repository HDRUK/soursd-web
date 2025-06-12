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
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import {
  SortableContext,
  SortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ComponentType, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import { useDebouncedCallback } from "use-debounce";

import DndItem from "../../components/DndItem";
import useDroppableSortItems, {
  UseDroppableSortItemsFnOptions,
  UseDroppableSortItemsProps,
} from "../../hooks/useDroppableSortItems";
import { WithStateWorkflow, WithTranslations } from "../../types/application";

import DndDroppableContainer from "../../components/DndDroppableContainer";
import DndSortableItem from "../../components/DndSortableItem";
import { dndDragRotate } from "../../consts/styles";
import { DndItems, DragUpdateEventArgsInitial } from "../../types/dnd";
import { findDroppables, findItem, findItemIndex } from "../../utils/dnd";
import KanbanBoardActionsMenu from "./KanbanBoardActions";
import KanbanBoardColumn from "./KanbanBoardColumn";
import KanbanBoardColumns from "./KanbanBoardColumns";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

interface KanbanBoardProps<T>
  extends WithStateWorkflow<WithTranslations<UseDroppableSortItemsProps<T>>> {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  initialData: DndItems<T>;
  cardComponent: ComponentType<T>;
  droppableFnOptions: Partial<UseDroppableSortItemsFnOptions<T>>;
}

export default function KanbanBoard<T>({
  adjustScale = false,
  cancelDrop,
  initialData,
  stateWorkflow,
  modifiers,
  strategy = verticalListSortingStrategy,
  onDragEnd,
  onDragOver,
  onDragUpdate,
  onMove,
  t,
  droppableFnOptions,
  ...restProps
}: KanbanBoardProps<T>) {
  const { handleDragSort, handleDragSortEnd, handleDragSortStart, handleMove } =
    useDroppableSortItems<T>({
      onDragEnd,
      onDragOver,
      onDragUpdate,
      onMove,
    });
  const [items, setItems] = useState<DndItems<T>>(initialData);
  const [containers] = useState(Object.keys(items) as UniqueIdentifier[]);
  const [activeData, setActiveData] =
    useState<DragUpdateEventArgsInitial<T> | null>(null);

  const activeId = activeData?.item.id;

  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const [clonedItems, setClonedItems] = useState<DndItems<T> | null>(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const renderSortableItemDragOverlay = (id: UniqueIdentifier) => {
    const data = findItem(id, items);

    return (
      data && (
        <DndItem dragOverlay isDroppable={data.isDroppable}>
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

    setActiveData(null);
    setClonedItems(null);
  };

  const getAllowedColumns = (containerId: UniqueIdentifier) => {
    return Object.keys(items).filter(key =>
      droppableFnOptions.isAllowed(
        {},
        { initial: { containerId }, containerId: key }
      )
    );
  };

  const handleDragEnd = (e: DragEndEvent) => {
    unstable_batchedUpdates(() => {
      handleDragSortEnd(e, items, {
        ...droppableFnOptions,
        setState: (state: DndItems<T>) => {
          setItems(items => {
            return {
              ...items,
              ...state,
            };
          });
        },
      });

      setActiveData(null);
    });
  };

  const handleDragOver = (e: DragOverEvent) => {
    handleDragSort(e, items, {
      ...droppableFnOptions,
      setState: (state: DndItems<T>) => {
        setItems(prevState => ({
          ...prevState,
          ...state,
        }));

        recentlyMovedToNewContainer.current = true;
      },
    });
  };

  const handleMoveClick = (item: T, moveToId: UniqueIdentifier) => {
    handleMove(
      {
        containerId: moveToId,
        item,
        items,
      },
      {
        setState: (state: DndItems<T>) => {
          setItems(prevState => ({
            ...prevState,
            ...state,
          }));
        },
      }
    );
  };

  const handleDragStart = (e: DragOverEvent) => {
    const initialData = handleDragSortStart(e, items);

    setActiveData(initialData);
    setClonedItems(items);
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
      onDragStart={handleDragStart}
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
                isDropAllowed={
                  !activeId ||
                  droppableFnOptions.isAllowed(
                    {},
                    {
                      initial: activeData,
                      containerId,
                    }
                  )
                }
                heading={`${t(containerId)} (${findDroppables(containerId, items).length})`}
                sx={{
                  height: "100%",
                  width: "236px",
                }}>
                {items[containerId].map(data => {
                  return (
                    <DndSortableItem
                      disabled={isSortingContainer}
                      isDroppable={data.isDroppable}
                      key={data.id}
                      id={data.id}
                      index={findItemIndex(containerId, data.id, items)}>
                      <restProps.cardComponent
                        data={data}
                        sx={{ width: "220px" }}
                        actions={
                          <KanbanBoardActionsMenu
                            columns={getAllowedColumns(containerId)}
                            onMoveClick={(_, moveToId) =>
                              handleMoveClick(data, moveToId)
                            }
                          />
                        }
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
        <DragOverlay
          adjustScale={adjustScale}
          dropAnimation={dropAnimation}
          modifiers={[restrictToFirstScrollableAncestor]}>
          {activeId &&
            !containers.includes(activeId) &&
            renderSortableItemDragOverlay(activeId)}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}
