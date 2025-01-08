import { mockedCustodianUser } from "@/mocks/data/custodian";
import { mockedApiPermissions } from "@/mocks/data/store";
import { isCustodianAdministrator, isCustodianApprover } from "./custodian";

describe("isCustodianAdministrator", () => {
  it("returns true when an adminstrator", () => {
    const result = isCustodianAdministrator(
      mockedCustodianUser({
        permissions: [10],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(true);
  });

  it("returns false when not adminstrator", () => {
    const result = isCustodianAdministrator(
      mockedCustodianUser({
        permissions: [],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(false);
  });
});

describe("isCustodianApprover", () => {
  it("returns true when an approver", () => {
    const result = isCustodianApprover(
      mockedCustodianUser({
        permissions: [11],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(true);
  });

  it("returns false when not approver", () => {
    const result = isCustodianApprover(
      mockedCustodianUser({
        permissions: [],
      }),
      mockedApiPermissions
    );

    expect(result).toEqual(false);
  });
});
