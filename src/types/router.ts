import { RoleConfig } from "./roles";

interface RoutePermissions extends RoleConfig {
  path: string;
}

export type { RoutePermissions };
