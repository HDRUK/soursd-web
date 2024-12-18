enum UserGroup {
  USERS = "USERS",
  ORGANISATIONS = "ORGANISATIONS",
  CUSTODIANS = "CUSTODIANS",
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

enum UserFeedSource {
  ORG = "ORG",
}

export {
  UserGroup,
  UserProvider,
  UserProfileCompletionCategories,
  UserFeedSource,
};
