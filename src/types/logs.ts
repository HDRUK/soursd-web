interface Comment {
  id: number;
  validation_log_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface ActionLog {
  id: number;
  entity_type: string;
  entity_id: number;
  action: string;
  completed_at: string | null;
}

interface ValidationLog {
  id: number;
  entity_type: string;
  entity_id: number;
  secondary_entity_type: string;
  secondary_entity_id: number;
  tertiary_entity_type: string;
  tertiary_entity_id: number;
  name: string;
  completed_at: string | null;
  manually_confirmed: number;
  comments?: Comment[];
}

type ActionLogEntity = "user" | "organisation" | "custodian";

export type { ActionLog, ActionLogEntity, ValidationLog, Comment };
