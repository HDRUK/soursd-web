import { CustodianUserRoles } from "@/consts/custodian";
import { CustodianUser, Permission } from "@/types/application";
import { getPermission } from "./permissions";

function isCustodianAdministrator(
  user: CustodianUser,
  permissions: Permission[]
) {
  const permission = getPermission(
    CustodianUserRoles.ADMINISTRATOR,
    permissions
  );

  return user?.permissions?.[0] === permission?.id;
}

function isCustodianApprover(user: CustodianUser, permissions: Permission[]) {
  const permission = getPermission(CustodianUserRoles.APPROVER, permissions);

  return user?.permissions?.[0] === permission?.id;
}

export { isCustodianAdministrator, isCustodianApprover };
