import { Permission } from "../permissions/types";

interface Organisation {
  organisation_name: string;
  organisation_unique_id: string;
  id: number;
  permissions: Permission[];
  lead_applicant_email: string;
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
