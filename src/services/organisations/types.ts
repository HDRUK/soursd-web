import { Approval } from "@/types/application";
import { User } from "../auth";
import { Permission } from "../permissions/types";

interface Organisation {
  organisation_name: string;
  organisation_unique_id: string;
  id: number;
  permissions: Permission[];
  approvals: Approval[];
  lead_applicant_email: string;
  registries: {
    user: User;
  }[];
}

type OrganisationResponse = Organisation;

interface OrganisationsResponse {
  data: Organisation[];
}

interface UpdateOrganisationPermissionsResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: string;
}

interface UpdateOrganisationPermissonsPayload {
  organisation_id: number;
  issuer_id: number;
  permissions: number[];
}

export type {
  OrganisationsResponse,
  OrganisationResponse,
  Organisation,
  UpdateOrganisationPermissionsResponse,
  UpdateOrganisationPermissonsPayload,
};
