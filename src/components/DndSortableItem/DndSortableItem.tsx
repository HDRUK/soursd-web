import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { ReactNode } from "react";
import DndItem from "../DndItem";

export interface DndSortableItemProps {
  children: ReactNode;
  id: UniqueIdentifier;
  index: number;
  disabled?: boolean;
  isDroppable?: boolean;
}

function DndSortableItem({
  disabled,
  isDroppable,
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
      listeners={listeners}
      sx={
        isDroppable === false && {
          visibility: "hidden",
          position: "fixed",
          zIndex: 0,
          cursor: "no-drop",
        }
      }>
      {children}
    </DndItem>
  );
}

export default DndSortableItem;
