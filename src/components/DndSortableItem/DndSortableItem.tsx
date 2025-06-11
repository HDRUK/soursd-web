import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { ReactNode } from "react";
import DndItem from "../DndItem";

export interface DndSortableItemProps {
  children: ReactNode;
  id: UniqueIdentifier;
  index: number;
  disabled?: boolean;
}

function DndSortableItem({
  disabled,
  id,
  index,
  children,
}: DndSortableItemProps) {
  const { setNodeRef, listeners, isDragging, transform, transition } =
    useSortable({
      id,
    });

  return (
    <DndItem
      ref={disabled ? undefined : setNodeRef}
      dragging={isDragging}
      index={index}
      transition={transition}
      transform={transform}
      listeners={listeners}>
      {children}
    </DndItem>
  );
}

export default DndSortableItem;
