import { Organisation, OrganisationIdvt } from "@/types/application";

type OrganisationResponse = Organisation;

interface OrganisationsResponse {
  data: Organisation[];
}

interface OrganisationsIdvtResponse {
  data: OrganisationIdvt;
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

type GetOrganisationInviteResponse = Organisation;

export type {
  OrganisationsResponse,
  OrganisationResponse,
  OrganisationsIdvtResponse,
  Organisation,
  UpdateOrganisationPermissionsResponse,
  UpdateOrganisationPermissonsPayload,
  GetOrganisationInviteResponse,
};
