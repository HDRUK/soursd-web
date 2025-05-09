import { EntityType } from "@/types/api";

interface Approval {
  custodian_id: number;
}

interface PostApprovalPayload {
  custodian_id?: number;
  organisation_id?: number;
  user_id?: number;
}

interface DeleteApprovalPayload {
  custodian_id: number;
  organisation_id?: number;
  user_id?: number;
}

interface PostApprovalPayloadWithEntity extends PostApprovalPayload {
  type: EntityType;
}

interface DeleteApprovalPayloadWithEntity extends DeleteApprovalPayload {
  type: EntityType;
}

interface ApprovalResponse {
  project_id: number;
  user_id: number;
  custodian_id: number;
  approved: number;
  comment: string;
}

export type {
  Approval,
  PostApprovalPayload,
  PostApprovalPayloadWithEntity,
  DeleteApprovalPayload,
  DeleteApprovalPayloadWithEntity,
  ApprovalResponse,
};
