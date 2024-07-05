interface Permission {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  enabled: number;
  pivot: {
    organisation_id: number;
    permission_id: number;
  };
}

type PermissionResponse = Permission;

interface PermissionsResponse {
  data: Permission[];
}

export type { PermissionsResponse, PermissionResponse, Permission };
