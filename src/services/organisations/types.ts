import { EMAIL_TEMPLATE } from "@/consts/application";
import {
  Organisation,
  OrganisationIdvt,
  Subsidiary,
} from "@/types/application";
import { Paged } from "@/types/requests";

type OrganisationResponse = Organisation;

type OrganisationsResponse = Paged<Organisation[]>;

interface OrganisationsIdvtResponse {
  data: OrganisationIdvt;
}

type PutOrganisationPayload = Partial<Organisation>;

type PostOrganisationPayload = Partial<Organisation>;
type PostOrganisationNewAccountPayload = Partial<Organisation>;
type PostOrganisationResponse = Organisation;
type PostOrganisationInviteResponse = Organisation;
interface PostOrganisationUnclaimedPayload {
  organisation_name: string;
  lead_applicant_email: string;
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
  custodian_id: number;
  permissions: number[];
}

type GetOrganisationInviteResponse = Organisation;

interface PostOrganisationInviteUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  identifier?: EMAIL_TEMPLATE;
  department_id?: number;
  is_delegate?: number;
  role?: string;
  user_group?: string;
}

type PostOrganisationInviteUserResponse = number;

type UpdateOrganisationSubsidiary = Subsidiary | Partial<Subsidiary>;

type PutOrganisationSubsidiaryPayload = Subsidiary;

type PostOrganisationSubsidiaryPayload = Omit<Subsidiary, "id">;

export type {
  GetOrganisationInviteResponse,
  Organisation,
  OrganisationResponse,
  OrganisationsIdvtResponse,
  OrganisationsResponse,
  PutOrganisationPayload,
  PostOrganisationInviteUserPayload,
  PostOrganisationInviteUserResponse,
  UpdateOrganisationPermissionsResponse,
  UpdateOrganisationPermissonsPayload,
  PostOrganisationPayload,
  PostOrganisationResponse,
  PostOrganisationInviteResponse,
  PostOrganisationUnclaimedPayload,
  UpdateOrganisationSubsidiary,
  PutOrganisationSubsidiaryPayload,
  PostOrganisationSubsidiaryPayload,
  PostOrganisationNewAccountPayload,
};
