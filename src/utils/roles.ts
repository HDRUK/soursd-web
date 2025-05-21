import { ROLES, ROLES_STATE } from "../consts/roles";
import { RolePermission } from "../types/roles";

const isRoleValid = (roles?: RolePermission | RolePermission[]) => {
  const CURRENT_USER_ROLES = JSON.parse(
    process.env.NEXT_PUBLIC_TEMP_USER_ROLES || "[]"
  ) as RolePermission[];

  if (!roles || CURRENT_USER_ROLES.find(({ role }) => role === ROLES.DEV))
    return true;

  if (Array.isArray(roles)) {
    return !!roles.find(({ role, state }) => {
      return !!CURRENT_USER_ROLES.find(
        ({ role: currentRole, state: currentState }) =>
          currentRole === role &&
          (currentState === ROLES_STATE.EDIT || currentState === state)
      );
    });
  }

  return !!CURRENT_USER_ROLES.find(
    ({ role: currentRole, state: currentState }) =>
      currentRole === roles.role && currentState === roles.state
  );
};

export { isRoleValid };
