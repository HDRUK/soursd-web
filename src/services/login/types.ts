interface LoginPayload {
  email: string;
  password: string;
}

interface LoginOTPPayload {
  email: string;
  password: string;
  otp: string;
}

export type { LoginPayload, LoginOTPPayload };
