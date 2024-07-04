import { Permission } from "../permissions/types";

interface Organisation {
  organisation_name: string;
  organisation_unique_id: string;
  id: number;
  permissions: Permission[];
  lead_applicant_email: string;
}

type OrganisationResponse = Organisation;

type OrganisationsResponse = Organisation[];

export type { OrganisationsResponse, OrganisationResponse, Organisation };
