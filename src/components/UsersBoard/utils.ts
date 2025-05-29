import { Collision, UniqueIdentifier } from "@dnd-kit/core";

function findContainer<T extends { id: UniqueIdentifier }>(
  id: UniqueIdentifier,
  items: Record<string, T[]>
) {
  if (id in items) {
    return id;
  }

  return Object.keys(items).find(key =>
    items[key].find(({ id: itemId }) => id === itemId)
  );
}

function findItemIndex<T extends { id: UniqueIdentifier }>(
  containerId: UniqueIdentifier,
  id: UniqueIdentifier,
  items: Record<string, T[]>
) {
  return items[containerId].findIndex(({ id: itemId }) => itemId === id);
}

function findItem<T extends { id: UniqueIdentifier }>(
  id: UniqueIdentifier,
  items: Record<string, T[]>
) {
  let foundItem;

  Object.keys(items).some(key => {
    const item = items[key as keyof typeof items].find(
      ({ id: itemId }) => id === itemId
    );

    if (item) {
      foundItem = item;
      return !!foundItem;
    }

    return null;
  });

  return foundItem;
}

function findFirstDroppable(collisions: Collision[] | null) {
  return collisions?.find(({ data }) => !!data?.droppableContainer);
}

export { findContainer, findItem, findItemIndex, findFirstDroppable };
