const VALIDATION_PASSWORD_FORMAT =
  /(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}/;

const VALIDATION_PASSWORD_LENGTH = 8;

export { VALIDATION_PASSWORD_FORMAT, VALIDATION_PASSWORD_LENGTH };
