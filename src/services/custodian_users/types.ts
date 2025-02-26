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

type GetCustodianUserResponse = CustodianUser;

export type {
  GetCustodiansUsersResponse,
  GetCustodianUserResponse,
  PatchCustodianUserPayload,
  PatchCustodianUserResponse,
  PostCustodianUserPayload,
  PostCustodianUserResponse,
};
