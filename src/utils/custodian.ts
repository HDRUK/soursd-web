import { CustodianUserRoles } from "../consts/custodian";
import { CustodianUser, Permission } from "../types/application";
import { getPermission } from "./permissions";

function isCustodianAdministrator(
  user: CustodianUser,
  permissions: Permission[]
) {
  console.log("******* permissions", permissions);
  const permission = getPermission(
    CustodianUserRoles.ADMINISTRATOR,
    permissions
  );

  return user?.user_permissions?.[0]?.permission_id === permission?.id;
}

function isCustodianApprover(user: CustodianUser, permissions: Permission[]) {
  const permission = getPermission(CustodianUserRoles.APPROVER, permissions);

  return user?.user_permissions?.[0]?.permission_id === permission?.id;
}

export { isCustodianAdministrator, isCustodianApprover };
