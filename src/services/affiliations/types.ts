import { ResearcherAffiliation } from "@/types/application";

type GetAffiliationsResponse = ResearcherAffiliation[];
type PostAffiliationsResponse = ResearcherAffiliation;
type PostAffiliationPayload = ResearcherAffiliation;
type PutAffiliationsResponse = ResearcherAffiliation;
type PutAffiliationsPayload = Partial<ResearcherAffiliation>;

export enum AffiliationStatus {
  Approved = "approved",
  Rejected = "rejected",
}

export type {
  GetAffiliationsResponse,
  PostAffiliationPayload,
  PostAffiliationsResponse,
  PutAffiliationsPayload,
  PutAffiliationsResponse,
};
