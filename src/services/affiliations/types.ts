import { ResearcherAffiliation } from "@/types/application";

type GetAffiliationsResponse = ResearcherAffiliation[];
type PostAffiliationsResponse = ResearcherAffiliation;
type PostAffiliationPayload = ResearcherAffiliation;
type PatchAffiliationsResponse = ResearcherAffiliation;
type PatchAffiliationsPayload = Partial<ResearcherAffiliation>;

export type {
  GetAffiliationsResponse,
  PostAffiliationPayload,
  PostAffiliationsResponse,
  PatchAffiliationsPayload,
  PatchAffiliationsResponse,
};
