import { CustodianUserRoles } from "@/consts/custodian";
import { CustodianUser, Permission } from "@/types/application";

function isCustodianAdministrator(
  user: CustodianUser,
  permissions: Permission[]
) {
  return !!permissions.find(
    permission => permission.name === CustodianUserRoles.ADMINISTRATOR
  );
}

function isCustodianApprover(user: CustodianUser, permissions: Permission[]) {
  return !!permissions.find(
    permission => permission.name === CustodianUserRoles.APPROVER
  );
}

export { isCustodianAdministrator, isCustodianApprover };
