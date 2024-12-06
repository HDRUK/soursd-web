import { DataCustodianUser } from "@/types/application";

type GetIssuersUsersResponse = DataCustodianUser[];

type PostIssuerUserResponse = DataCustodianUser;

type PostIssuerUserPayload = Omit<
  DataCustodianUser,
  "created_at" | "updated_at"
>;

type PatchIssuerUserResponse = DataCustodianUser;

type PatchIssuerUserPayload = Omit<
  DataCustodianUser,
  "created_at" | "updated_at"
>;

export type {
  GetIssuersUsersResponse,
  PostIssuerUserResponse,
  PostIssuerUserPayload,
  PatchIssuerUserResponse,
  PatchIssuerUserPayload,
};
