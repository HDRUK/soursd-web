import { DragEndEvent, DragOverEvent, UniqueIdentifier } from "@dnd-kit/core";

export type DndItems<T> = Record<
  UniqueIdentifier,
  (T & {
    id: UniqueIdentifier;
    isDroppable?: boolean;
  })[]
>;

export type DragUpdateEvent = DragEndEvent | DragOverEvent;

export type DragUpdateEventArgsInitial<T> = {
  containerId: UniqueIdentifier;
  item: T | undefined;
  itemIndex: number;
};

export type DragUpdateEventArgs<T> = {
  containerId?: UniqueIdentifier;
  item?: T | undefined;
  itemIndex?: number;
  state?: DndItems<T>;
  initial: DragUpdateEventArgsInitial<T> | undefined;
};
