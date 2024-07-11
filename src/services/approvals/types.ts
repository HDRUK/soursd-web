import { EntityType } from "@/types/api";

interface Approval {
  issuer_id: number;
}

interface PostApprovalsPayload {
  issuer_id: number;
  organisation_id?: number;
  user_id?: number;
}

interface PostApprovalsPayloadWithEntity extends PostApprovalsPayload {
  type: EntityType;
}

export type { Approval, PostApprovalsPayload, PostApprovalsPayloadWithEntity };
