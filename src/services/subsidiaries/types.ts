import { Subsidiary } from "@/types/application";

type PutSubsidiaryPayload = Subsidiary;

type PutSubsidiaryResponse = Subsidiary;

type PostSubsidiaryPayload = Omit<Subsidiary, "id">;

type PostSubsidiaryResponse = Subsidiary;

export type {
  PostSubsidiaryResponse,
  PutSubsidiaryResponse,
  PostSubsidiaryPayload,
  PutSubsidiaryPayload,
};
