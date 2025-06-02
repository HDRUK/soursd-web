import { Permission } from "../types/application";

function getPermission(name: string, permissions: Permission[]) {
  return permissions.find(permission => permission.name === name);
}

export { getPermission };
