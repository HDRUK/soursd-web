import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface UsersBoardCardProps<T> {
  id: string;
  data: T;
  children: ReactNode;
  isDraggable?: boolean;
}

export default function UsersBoardCard<T>({
  id,
  data,
  children,
  isDraggable = true,
}: UsersBoardCardProps<T>) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data,
      disabled: !isDraggable,
    });

  let draggableSx: SxProps = {
    p: 1,
    cursor: "move",
  };

  if (isDragging) {
    draggableSx = {
      ...draggableSx,
      background: "#F6DFF1",
      transform: `${CSS.Translate.toString(transform)}${isDragging ? " rotate(10deg)" : ""}`,
    };
  } else if (isDraggable) {
    draggableSx = {
      ...draggableSx,
      cursor: "pointer",
    };
  }

  return (
    <Card ref={setNodeRef} {...listeners} {...attributes} sx={draggableSx}>
      {children}
    </Card>
  );
}
