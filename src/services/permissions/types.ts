import { Permission } from "@/types/application";

type PermissionResponse = Permission;

interface PermissionsResponse {
  data: Permission[];
}

export type { PermissionsResponse, PermissionResponse, Permission };
