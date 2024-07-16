import { EntityType } from "@/types/api";

interface Approval {
  issuer_id: number;
}

interface PostApprovalPayload {
  issuer_id: number;
  organisation_id?: number;
  user_id?: number;
}

interface DeleteApprovalPayload {
  issuer_id: number;
  organisation_id?: number;
  user_id?: number;
}

interface PostApprovalPayloadWithEntity extends PostApprovalPayload {
  type: EntityType;
}

interface DeleteApprovalPayloadWithEntity extends DeleteApprovalPayload {
  type: EntityType;
}

export type {
  Approval,
  PostApprovalPayload,
  PostApprovalPayloadWithEntity,
  DeleteApprovalPayload,
  DeleteApprovalPayloadWithEntity,
};
