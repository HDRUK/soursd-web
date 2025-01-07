import { EMAIL_TEMPLATE } from "@/consts/application";
import { CustodianUser } from "@/types/application";

type GetCustodiansUsersResponse = CustodianUser[];

type PostCustodianUserResponse = number;

type PostCustodianUserPayload = Omit<
  CustodianUser,
  "created_at" | "updated_at"
>;

type PatchCustodianUserResponse = CustodianUser;

type PatchCustodianUserPayload = Omit<
  CustodianUser,
  "created_at" | "updated_at"
>;

export type {
  GetCustodiansUsersResponse,
  PostCustodianUserResponse,
  PostCustodianUserPayload,
  PatchCustodianUserResponse,
  PatchCustodianUserPayload,
};
