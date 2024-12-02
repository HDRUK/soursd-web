enum UserGroup {
  RESEARCHERS = "RESEARCHERS",
  ORGANISATIONS = "ORGANISATIONS",
  ISSUERS = "ISSUERS",
  ADMINS = "ADMINS",
}

enum UserProvider {
  SIT = "sit",
  KEYCLOAK = "keycloak",
}

enum UserProfileCompletionCategories {
  IDENTITY = "identity",
  AFFILIATIONS = "affiliations",
  EXPERIENCE = "experience",
  TRAINING = "training",
}

export { UserGroup, UserProvider, UserProfileCompletionCategories };
