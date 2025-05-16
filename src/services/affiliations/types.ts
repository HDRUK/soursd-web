import { ResearcherAffiliation } from "../../types/application";

type GetAffiliationsResponse = ResearcherAffiliation[];
type PostAffiliationsResponse = ResearcherAffiliation;
type PostAffiliationPayload = ResearcherAffiliation;
type PatchAffiliationsResponse = ResearcherAffiliation;
type PutAffiliationsResponse = ResearcherAffiliation;
type PatchAffiliationsPayload = Partial<ResearcherAffiliation>;

export enum AffiliationStatus {
  Approved = "approved",
  Rejected = "rejected",
}

export type {
  GetAffiliationsResponse,
  PostAffiliationPayload,
  PostAffiliationsResponse,
  PatchAffiliationsPayload,
  PatchAffiliationsResponse,
  PutAffiliationsResponse,
};
