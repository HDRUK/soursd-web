import { RoleConfig } from "./roles";

interface RoutePermissions extends RoleConfig {
  path: string;
}

interface RouteConfig {
  path: string;
  key: string;
}

export type { RoutePermissions, RouteConfig };
