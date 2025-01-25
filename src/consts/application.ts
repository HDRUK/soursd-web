const VALIDATION_SCHEMA_KEY = "VALIDATION_SCHEMA";
const QUERY_REFETCH_LONG_DELAY = 20000;

const CUSTODIAN_ID = 1;

enum EMAIL_TEMPLATE {
  DELEGATE_SPONSOR = "delegate_sponsor",
  USER_INVITE = "researcher_invite",
  CUSTODIAN_INVITE = "custodian_invite",
  CUSTODIAN_USER_INVITE = "custodian_user_invite",
  ORGANISATION_INVITE = "organisation_invite",
}

export {
  VALIDATION_SCHEMA_KEY,
  QUERY_REFETCH_LONG_DELAY,
  CUSTODIAN_ID,
  EMAIL_TEMPLATE,
};
