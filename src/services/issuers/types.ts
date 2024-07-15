import { Issuer } from "@/types/application";

interface GetIssuerInviteResponse {
  name: string;
  contact_email: string;
  invite_sent_at: string;
  invite_accepted_at: string;
  enabled: number;
}

type GetIssuerResponse = Issuer;

export type { GetIssuerInviteResponse, GetIssuerResponse };
