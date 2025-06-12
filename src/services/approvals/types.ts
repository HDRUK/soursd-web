import { EntityType } from "@/types/api";
import { CustodianProjectUser } from "@/types/application";

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

type ApprovalResponse = CustodianProjectUser;

type WorkflowStateResponse = string[];

export type {
  Approval,
  WorkflowStateResponse,
  PostApprovalPayload,
  PostApprovalPayloadWithEntity,
  DeleteApprovalPayload,
  DeleteApprovalPayloadWithEntity,
  ApprovalResponse,
};
