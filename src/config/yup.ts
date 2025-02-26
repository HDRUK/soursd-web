import * as yup from "yup";

yup.addMethod<yup.StringSchema>(
  yup.string,
  "testLengthBetween",
  function ({ maxLength, minLength }, message) {
    return this.min(minLength, message).max(maxLength, message);
  }
);

export default yup;
