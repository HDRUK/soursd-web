import { EMAIL_TEMPLATE } from "@/consts/application";
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

interface PostCustodianInviteUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  identifier?: EMAIL_TEMPLATE;
}

type PostCustodianInviteUserResponse = number;

export type {
  PostCustodianInviteUserPayload,
  PostCustodianInviteUserResponse,
  GetCustodianInviteResponse,
  GetCustodianResponse,
  GetCustodiansResponse,
  SendCustodianInvitePayload,
  SendCustodianInviteResponse,
  PatchCustodianPayload,
  PatchCustodianResponse,
};
