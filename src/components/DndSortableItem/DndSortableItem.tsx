import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { ReactNode } from "react";
import DndItem from "../DndItem";

export interface DndSortableItemProps {
  children: ReactNode;
  containerId: UniqueIdentifier;
  id: UniqueIdentifier;
  index: number;
  handle: boolean;
  disabled?: boolean;
  getIndex(id: UniqueIdentifier): number;
}

function DndSortableItem({
  disabled,
  id,
  index,
  containerId,
  getIndex,
  children,
}: DndSortableItemProps) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition,
  } = useSortable({
    id,
  });
  return (
    <DndItem
      ref={disabled ? undefined : setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      index={index}
      transition={transition}
      transform={transform}
      listeners={listeners}>
      {children}
    </DndItem>
  );
}

export default DndSortableItem;
