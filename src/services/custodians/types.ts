import { Custodian } from "@/types/application";

interface GetCustodianInviteResponse {
  name: string;
  contact_email: string;
  invite_sent_at: string;
  invite_accepted_at: string;
  enabled: number;
}

interface SendCustodianInvitePayload {
  to: number;
}

interface SendCustodianInviteResponse {
  message: string;
  data: object;
}

type GetCustodianResponse = Custodian;

type GetCustodiansResponse = Custodian[];

type PatchCustodianPayload = Partial<Custodian>;

type PatchCustodianResponse = Custodian;

export type {
  GetCustodianInviteResponse,
  GetCustodianResponse,
  GetCustodiansResponse,
  SendCustodianInvitePayload,
  SendCustodianInviteResponse,
  PatchCustodianPayload,
  PatchCustodianResponse,
};
