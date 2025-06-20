import { UseDroppableSortItemsFnOptions } from "@/hooks/useDroppableSortItems";
import { WorkflowTransitionsResponse } from "@/services/custodian_approvals";
import { WithModelState } from "@/types/application";
import { DndItems, DragUpdateEventArgs } from "@/types/dnd";
import { Collision, UniqueIdentifier } from "@dnd-kit/core";

function findContainer<T>(id: UniqueIdentifier, items: DndItems<T>) {
  if (id in items) {
    return id;
  }

  return Object.keys(items).find(key =>
    items[key].find(({ id: itemId }) => id === itemId)
  );
}

function findItemIndex<T>(
  containerId: UniqueIdentifier,
  id: UniqueIdentifier,
  items: DndItems<T>
) {
  return items[containerId].findIndex(({ id: itemId }) => itemId === id);
}

function findItemInContainer<T>(
  containerId: UniqueIdentifier,
  id: UniqueIdentifier,
  items: DndItems<T>
) {
  return items[containerId].find(item => item.id === id);
}

function findItem<T>(id: UniqueIdentifier, items: DndItems<T>) {
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

function pruneItem<T>(id: UniqueIdentifier, items: DndItems<T>) {
  return Object.keys(items).reduce((data, key) => {
    data[key] = items[key].filter(item => item.id !== id);

    return data;
  }, {});
}

function findDroppables<T>(containerId: UniqueIdentifier, items: DndItems<T>) {
  return items[containerId].filter(item => item?.isDroppable !== false);
}

function findFirstDroppable(collisions: Collision[] | null) {
  return collisions?.find(({ data }) => !!data?.droppableContainer);
}

export {
  findItemInContainer,
  findContainer,
  findItem,
  findItemIndex,
  findFirstDroppable,
  pruneItem,
  findDroppables,
};
