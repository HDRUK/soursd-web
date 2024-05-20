interface IssuerDetailsResponse {
  name: string;
  verificationExpiry: string;
}

interface IssuerSignupPayload {
  password: string;
}

export type { IssuerDetailsResponse, IssuerSignupPayload };
