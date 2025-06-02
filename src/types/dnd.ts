import { UniqueIdentifier } from "@dnd-kit/core";

export type DndItems<T> = Record<
  UniqueIdentifier,
  (T & {
    id: UniqueIdentifier;
  })[]
>;
