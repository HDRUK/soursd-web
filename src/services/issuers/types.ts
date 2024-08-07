import { Issuer } from "@/types/application";

interface GetIssuerInviteResponse {
  name: string;
  contact_email: string;
  invite_sent_at: string;
  invite_accepted_at: string;
  enabled: number;
}

interface SendIssuerInvitePayload {
  to: number,
}

interface SendIssuerInviteResponse {
  message: string,
  data: object,
}

type GetIssuerResponse = Issuer;
type GetIssuersResponse {
  data: Issuer[];
}

export type { 
  GetIssuerInviteResponse,
  GetIssuerResponse,
  GetIssuersResponse,
  SendIssuerInvitePayload,
  SendIssuerInviteResponse,
};
