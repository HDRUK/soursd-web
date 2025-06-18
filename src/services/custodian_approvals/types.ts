import {
  CustodianProjectUser,
  CustodianProjectOrganisation,
} from "@/types/application";

type WorkflowStateResponse = string[];

type GetCustodianProjectUsersResponse = CustodianProjectUser[];
type GetCustodianProjectUserResponse = CustodianProjectUser;

type GetCustodianProjectOrganisationsResponse = CustodianProjectOrganisation[];
type GetCustodianProjectOrganisationResponse = CustodianProjectOrganisation;

interface ChangeValidationStatusPayload {
  status: string;
  comment: string;
}

export type {
  WorkflowStateResponse,
  GetCustodianProjectUsersResponse,
  GetCustodianProjectUserResponse,
  GetCustodianProjectOrganisationsResponse,
  GetCustodianProjectOrganisationResponse,
  ChangeValidationStatusPayload,
};
