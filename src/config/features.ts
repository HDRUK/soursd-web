import { ROLES, ROLES_STATE } from "@/consts/roles";
import { Features } from "@/types/roles";

export const FEATURES: Features = {
  LoginOtp: {
    enabled: false,
  },
  Footer: {
    permissions: [
      {
        role: ROLES.USER,
        state: ROLES_STATE.VIEW,
      },
      {
        role: ROLES.RESEARCHER,
        state: ROLES_STATE.VIEW,
      },
      {
        role: ROLES.OPERATIONAL_INSTITUTE,
        state: ROLES_STATE.VIEW,
      },
      {
        role: ROLES.OPERATIONAL_TRE,
        state: ROLES_STATE.VIEW,
      },
    ],
  },
};
