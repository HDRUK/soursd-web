interface UsersLoginResponse {
  name: string;
  verificationExpiry: string;
}

interface UsersLoginPayload {
  email: string;
  password: string;
}

export type { UsersLoginPayload, UsersLoginResponse };
