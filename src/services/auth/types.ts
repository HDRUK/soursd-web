import { Auth, Organisation } from "@/types/application";

interface PostLoginPayload {
  email: string;
  password: string;
}

type LoginRequest = Record<string, string>;

type LoginResponse = Auth;

interface LoginOTPPayload {
  email: string;
  password: string;
  otp: string;
}

interface ResetPasswordPayload {
  email: string;
  password: string;
}

interface PostRegisterOrganisationPayload
  extends Omit<
    Organisation,
    "organisation_unique_id" | "permissions" | "id" | "registries"
  > {
  email: string;
  first_name?: string;
  last_name?: string;
}
interface PostRegisterIssuerPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

interface PostRegisterResearcherPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export type {
  LoginOTPPayload,
  LoginRequest,
  LoginResponse,
  PostLoginPayload,
  PostRegisterIssuerPayload,
  PostRegisterOrganisationPayload,
  PostRegisterResearcherPayload,
  ResetPasswordPayload,
};
