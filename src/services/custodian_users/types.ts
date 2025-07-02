import { CustodianUser } from "@/types/application";

type GetCustodiansUsersResponse = CustodianUser[];

type PostCustodianUserResponse = number;

type PostCustodianUserPayload = Omit<
  CustodianUser,
  "created_at" | "updated_at"
>;

type PutCustodianUserResponse = CustodianUser;

type PutCustodianUserPayload = Omit<CustodianUser, "created_at" | "updated_at">;

type GetCustodianUserResponse = CustodianUser;

export type {
  GetCustodiansUsersResponse,
  GetCustodianUserResponse,
  PutCustodianUserPayload,
  PutCustodianUserResponse,
  PostCustodianUserPayload,
  PostCustodianUserResponse,
};
