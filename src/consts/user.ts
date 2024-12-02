enum UserGroup {
  USERS = "USERS",
  ORGANISATIONS = "ORGANISATIONS",
  DATA_CUSTODIAN = "DATA_CUSTODIAN",
  ADMINS = "ADMINS",
}

enum UserProvider {
  SIT = "sit",
  KEYCLOAK = "keycloak",
}

export { UserGroup, UserProvider };
