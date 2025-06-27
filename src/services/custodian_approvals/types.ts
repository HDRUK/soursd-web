import {
  CustodianProjectUser,
  CustodianProjectOrganisation,
} from "../../types/application";

type WorkflowStateResponse = string[];
type WorkflowTransitionsResponse = Record<string, string[]>;

type GetCustodianProjectUsersResponse = CustodianProjectUser[];
type GetCustodianProjectUserResponse = CustodianProjectUser;

type GetCustodianProjectOrganisationsResponse = CustodianProjectOrganisation[];
type GetCustodianProjectOrganisationResponse = CustodianProjectOrganisation;

interface ChangeValidationStatusPayload {
  status: string;
  comment: string;
}

interface DeleteCustodianProjectUserPayload {
  custodianId: number;
  id: number;
}

interface DeleteCustodianProjectOrganisationPayload {
  custodianId: number;
  id: number;
}

export type {
  WorkflowStateResponse,
  WorkflowTransitionsResponse,
  GetCustodianProjectUsersResponse,
  GetCustodianProjectUserResponse,
  GetCustodianProjectOrganisationsResponse,
  GetCustodianProjectOrganisationResponse,
  ChangeValidationStatusPayload,
  DeleteCustodianProjectUserPayload,
  DeleteCustodianProjectOrganisationPayload,
};
