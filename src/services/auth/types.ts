import { Organisation, User } from "@/types/application";

interface PostLoginPayload {
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
  organisation_id: number;
  first_name: string;
  last_name: string;
  consent_scrape: number;
}

export type {
  AuthDetails,
  PostLoginPayload,
  LoginRequest,
  LoginOTPPayload,
  PostRegisterOrganisationPayload,
  PostRegisterIssuerPayload,
  PostRegisterResearcherPayload,
  ResetPasswordPayload,
  LoginResponse,
};
