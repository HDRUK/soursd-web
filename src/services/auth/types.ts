import { UserGroup } from "@/consts/user";
import { Approval } from "@/types/application";
import { FileResponse } from "../files/types";
import { Permission } from "../permissions/types";

interface LoginPayload {
  email: string;
  password: string;
}

type LoginRequest = Record<string, string>;

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_group: keyof typeof UserGroup;
  permissions: Permission[];
  approvals: Approval[];
  registry: {
    files: FileResponse[];
  };
}

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
  LoginOTPPayload,
  LoginPayload,
  LoginRequest,
  LoginResponse,
  PostRegisterResearcherPayload,
  ResetPasswordPayload,
  User,
};
