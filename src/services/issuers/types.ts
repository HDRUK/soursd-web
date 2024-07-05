import { Permission } from "../permissions/types";

interface Issuer {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  contact_email: string;
  enabled: boolean;
  invite_accepted_at: string | null;
  invite_sent_at: string | null;
  permissions: Permission[];
}

interface IssuerInviteResponse {
  name: string;
  contact_email: string;
  invite_sent_at: string;
  invite_accepted_at: string;
  enabled: number;
}

type IssuerResponse = Issuer;

export type { IssuerInviteResponse, IssuerResponse, Issuer };
