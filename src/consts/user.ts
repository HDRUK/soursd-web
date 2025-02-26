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

enum AffiliationRelationship {
  EMPLOYEE = "employee",
  STUDENT = "student",
  HONORARY_CONTRACT = "honoraryContract",
}

export {
  UserGroup,
  UserProvider,
  UserProfileCompletionCategories,
  UserFeedSource,
  AffiliationRelationship,
};
