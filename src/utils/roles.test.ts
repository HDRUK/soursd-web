import { ROLES, ROLES_STATE } from "@/consts/roles";
import { isRoleValid } from "./roles";

describe("isRoleValid", () => {
  it("validates the roles", async () => {
    const result = isRoleValid([
      {
        role: ROLES.ADMIN_HDR,
        state: ROLES_STATE.VIEW,
      },
    ]);

    expect(result).toEqual(false);
  });

  it("invalidates the roles", async () => {
    const result = isRoleValid([
      {
        role: ROLES.OPERATIONAL_HDR,
        state: ROLES_STATE.VIEW,
      },
    ]);

    expect(result).toEqual(true);
  });

  it("validates the single role", async () => {
    const result = isRoleValid({
      role: ROLES.ADMIN_HDR,
      state: ROLES_STATE.VIEW,
    });

    expect(result).toEqual(false);
  });

  it("invalidates the single role", async () => {
    const result = isRoleValid({
      role: ROLES.OPERATIONAL_HDR,
      state: ROLES_STATE.VIEW,
    });

    expect(result).toEqual(true);
  });

  it("validates when dev", async () => {
    process.env.NEXT_PUBLIC_TEMP_USER_ROLES =
      '[{ "role": "dev", "state": "view" }]';

    const result = isRoleValid([
      {
        role: ROLES.OPERATIONAL_HDR,
        state: ROLES_STATE.VIEW,
      },
    ]);

    expect(result).toEqual(true);
  });
});
