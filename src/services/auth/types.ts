interface LoginPayload {
  email: string;
  password: string;
}

type LoginRequest = Record<string, string>;

interface LoginResponse {
  access_token: string;
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
