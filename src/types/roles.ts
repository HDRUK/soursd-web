import { ROLES, ROLES_STATE } from "@/consts/roles";

type RolePermission = {
  role: ROLES;
  state: ROLES_STATE;
};

type RoleConfig = {
  permissions?: RolePermission[];
};

type FeatureIds = "Footer";

type Features = Record<
  FeatureIds,
  {
    path: string;
  } & RoleConfig
>;

export type { RolePermission, Features, FeatureIds, RoleConfig };
