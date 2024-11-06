import * as yup from "yup";

declare module "yup" {
  interface StringSchema extends yup.StringSchema {
    testLengthBetween(
      { minLength: number, maxLength: number },
      value: string
    ): StringSchema;
  }
}
