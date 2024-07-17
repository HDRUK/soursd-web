import * as yup from "Yup";

declare module "yup" {
  interface StringSchema extends yup.StringSchema {
    testLengthBetween(
      { minLength: number, maxLength: number },
      value: string
    ): StringSchema;
  }
}

// Completion screen

// Tabs on profile, accreditations etc each has a status x or good

// Left column -> status - profile complete or not complete also unique id is shown

// Click on profile not complete takes you to first tab in workflow which has not been complete

// First time profile is complete show unique id and a message in a modalClasses. Id should be copyable on click
