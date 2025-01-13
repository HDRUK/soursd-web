import { EMAIL_TEMPLATE } from "@/consts/application";
import { Organisation, OrganisationIdvt } from "@/types/application";
import { Paged } from "@/types/requests";

type OrganisationResponse = Organisation;

type OrganisationsResponse = Paged<Organisation[]>;

interface OrganisationsIdvtResponse {
  data: OrganisationIdvt;
}

type PatchOrganisationPayload = Partial<Organisation>;

interface UpdateOrganisationPermissionsResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: string;
}

interface UpdateOrganisationPermissonsPayload {
  organisation_id: number;
  custodian_id: number;
  permissions: number[];
}

type GetOrganisationInviteResponse = Organisation;

interface PostOrganisationInviteUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  identifier?: EMAIL_TEMPLATE;
}

type PostOrganisationInviteUserResponse = number;

export type {
  GetOrganisationInviteResponse,
  Organisation,
  OrganisationResponse,
  OrganisationsIdvtResponse,
  OrganisationsResponse,
  PatchOrganisationPayload,
  PostOrganisationInviteUserPayload,
  PostOrganisationInviteUserResponse,
  UpdateOrganisationPermissionsResponse,
  UpdateOrganisationPermissonsPayload,
};
