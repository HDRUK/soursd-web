interface LoginPayload {
  email: string;
  password: string;
}

type LoginRequest = Record<string, string>;

interface LoginResponse {
  access_token: string;
  is_issuer?: boolean;
  is_organisation?: boolean;
  is_researcher?: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    user_group: "RESEARCHERS" | "ORGANISATIONS" | "ISSUERS";
  };
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

interface RegisterPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export type {
  LoginPayload,
  LoginRequest,
  LoginOTPPayload,
  RegisterPayload,
  ResetPasswordPayload,
  LoginResponse,
};
