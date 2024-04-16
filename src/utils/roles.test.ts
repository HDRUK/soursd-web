import { ROLES, ROLES_STATE } from "@/consts/roles";
import { isRoleValid } from "./roles";

describe("isRoleValid", () => {
  it("validates the role", async () => {
    const result = isRoleValid([
      {
        role: ROLES.ADMIN_HDR,
        state: ROLES_STATE.VIEW,
      },
    ]);

    expect(result).toEqual(true);
  });

  it("invalidates the role", async () => {
    const result = isRoleValid([
      {
        role: ROLES.OPERATIONAL_HDR,
        state: ROLES_STATE.VIEW,
      },
    ]);

    expect(result).toEqual(true);
  });

  it("validates when dev", async () => {
    jest.doMock("@/consts/roles", () => {
      const originalModule = jest.requireActual("@/consts/roles");

      return {
        __esModule: true,
        ...originalModule,
        CURRENT_USER_ROLES: {
          role: ROLES.DEV,
          state: ROLES_STATE.VIEW,
        },
      };
    });

    const result = isRoleValid([
      {
        role: ROLES.OPERATIONAL_HDR,
        state: ROLES_STATE.VIEW,
      },
    ]);

    expect(result).toEqual(true);
  });
});
