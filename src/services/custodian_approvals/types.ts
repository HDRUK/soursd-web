import { CustodianProjectUser } from "@/types/application";

type WorkflowStateResponse = string[];

type GetCustodianProjectUsersResponse = CustodianProjectUser[];
type GetCustodianProjectUserResponse = CustodianProjectUser;

interface ChangeValidationStatusPayload {
  status: string;
  comment: string;
}

export type {
  WorkflowStateResponse,
  GetCustodianProjectUsersResponse,
  GetCustodianProjectUserResponse,
  ChangeValidationStatusPayload,
};
