enum ROLES {
  DEV = "dev",
  ADMIN_HDR = "admin",
  OPERATIONAL_HDR = "operational_hdr",
  OPERATIONAL_TRE = "operational_tre",
  OPERATIONAL_INSTITUTE = "operational_institute",
  RESEARCHER = "researcher",
  USER = "user",
}

enum ROLES_STATE {
  VIEW = "view",
  EDIT = "edit",
}

const CURRENT_USER_ROLES = [
  {
    role: ROLES.DEV,
    state: ROLES_STATE.VIEW,
  },
];

export { ROLES, ROLES_STATE, CURRENT_USER_ROLES };
