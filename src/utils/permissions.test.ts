import { CustodianUserRoles } from "@/consts/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import { getPermission } from "./permissions";

describe("getPermission", () => {
  it("returns the correct permissions", () => {
    const result = getPermission(
      CustodianUserRoles.ADMINISTRATOR,
      mockedApiPermissions
    );

    expect(result?.name).toEqual(CustodianUserRoles.ADMINISTRATOR);
  });
});
