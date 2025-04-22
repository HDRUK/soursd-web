import { ResearcherAffiliation } from "@/types/application";

type GetAffiliationsResponse = ResearcherAffiliation[];
type PostAffiliationsResponse = ResearcherAffiliation;
type PostAffiliationPayload = ResearcherAffiliation;
type PatchAffiliationsResponse = ResearcherAffiliation;
type PutAffiliationsResponse = ResearcherAffiliation;
type PatchAffiliationsPayload = Partial<ResearcherAffiliation>;

type AffiliationStatus = "approved" | "rejected";

export type {
  AffiliationStatus,
  GetAffiliationsResponse,
  PostAffiliationPayload,
  PostAffiliationsResponse,
  PatchAffiliationsPayload,
  PatchAffiliationsResponse,
  PutAffiliationsResponse,
};
