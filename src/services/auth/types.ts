import { Organisation, User } from "@/types/application";

interface LoginPayload {
  email: string;
  password: string;
}

type LoginRequest = Record<string, string>;

interface AuthDetails {
  access_token: string;
  is_issuer?: boolean;
  is_organisation?: boolean;
  is_researcher?: boolean;
  expires: number;
  refresh_expires_in: number;
}

interface LoginResponse extends AuthDetails {
  user: User;
}

interface LoginOTPPayload {
  email: string;
  password: string;
  otp: string;
}

interface ResetPasswordPayload {
  email: string;
  password: string;
}

type PostRegisterOrganisationPayload = Pick<
  Organisation,
  | "dpo_name"
  | "dpo_email"
  | "hr_name"
  | "hr_email"
  | "organisation_name"
  | "lead_applicant_organisation_email"
  | "lead_applicant_organisation_name"
  | "password"
>;

export type {
  AuthDetails,
  User,
  LoginPayload,
  LoginRequest,
  LoginOTPPayload,
  PostRegisterOrganisationPayload,
  ResetPasswordPayload,
  LoginResponse,
};
