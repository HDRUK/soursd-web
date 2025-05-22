import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import DndContainer, { DndContainerProps } from "../DndContainer";

type DndDroppableContainerProps = DndContainerProps & {
  disabled?: boolean;
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
};

export default function DndDroppableContainer({
  children,
  disabled,
  id,
  items,
  ...restProps
}: DndDroppableContainerProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "container",
      children: items,
    },
  });

  return (
    <DndContainer ref={disabled ? undefined : setNodeRef} {...restProps}>
      {children}
    </DndContainer>
  );
}
