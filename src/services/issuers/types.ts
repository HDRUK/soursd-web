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
  type: string,
  identifier: string,
}

interface SendIssuerInviteResponse {
  message: string,
  data: object,
}

type GetIssuerResponse = Issuer;
type GetIssuersResponse = Issuer[];

export type { 
  GetIssuerInviteResponse,
  GetIssuerResponse,
  GetIssuersResponse,
  SendIssuerInvitePayload,
  SendIssuerInviteResponse,
};
