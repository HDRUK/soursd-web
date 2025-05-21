import { mockedApiPermissions } from "@/mocks/data/store";
import { CustodianUserRoles } from "../consts/custodian";
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
