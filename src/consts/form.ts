const VALIDATION_PASSWORD_FORMAT =
  /(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%\\?]*[!#%\\?])[A-Za-z0-9!#%\\?]{8,32}/;

const VALIDATION_PASSWORD_LENGTH = 8;
const VALIDATION_OTP_PASSCODE_LENGTH = 6;

const VALIDATION_POSTCODE_FORMAT =
  /[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}/;
const VALIDATION_COMPANY_NUMBER =
  /^((AC|ZC|FC|GE|LP|OC|SE|SA|SZ|SF|GS|SL|SO|SC|ES|NA|NZ|NF|GN|NL|NC|R0|NI|EN|\d{2}|SG|FE)\d{5}(\d|C|R))|((RS|SO)\d{3}(\d{3}|\d{2}[WSRCZF]|\d(FI|RS|SA|IP|US|EN|AS)|CUS))|((NI|SL)\d{5}[\dA])|(OC(([\dP]{5}[CWERTB])|([\dP]{4}(OC|CU))))$/;

const VALIDATION_CE_CERTIFICATION_NUMBER = /^[\w]{4}$/;

const VALIDATION_ISO_CERTIFICATION_NUMBER = /^[A-Z0-9]{4}$/;

const VALIDATION_DSPTK_CERTIFICATION_NUMBER = /^DSPTK-\d{4}-\d{5}$/;

const VALIDATION_ORC_ID = /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/;

const VALIDATION_ROR_ID = /^0[a-hj-km-np-tv-z|0-9]{6}[0-9]{2}$/;

const VALIDATION_URL = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;

const VALIDATION_CHARITY_ID = /^[A-Za-z0-9]{8}/;

const ORGANISATION_SIZE_OPTIONS = [
  {
    label: "Small enterprise: 10 to 49 employees",
    value: "10 to 49 employees",
  },
  {
    label: "Medium-sized enterprise: 50 to 249 employees",
    value: "50 to 249 employees",
  },
  {
    label: "Large enterprise: 250 or more employees",
    value: "250 or more employees",
  },
];

enum FormModes {
  CREATE = "create",
  EDIT = "edit",
}

export {
  FormModes,
  VALIDATION_CE_CERTIFICATION_NUMBER,
  VALIDATION_ISO_CERTIFICATION_NUMBER,
  VALIDATION_DSPTK_CERTIFICATION_NUMBER,
  VALIDATION_COMPANY_NUMBER,
  VALIDATION_ORC_ID,
  VALIDATION_OTP_PASSCODE_LENGTH,
  VALIDATION_PASSWORD_FORMAT,
  VALIDATION_PASSWORD_LENGTH,
  VALIDATION_POSTCODE_FORMAT,
  VALIDATION_ROR_ID,
  VALIDATION_URL,
  VALIDATION_CHARITY_ID,
  ORGANISATION_SIZE_OPTIONS,
};
