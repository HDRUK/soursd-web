import { User } from "../auth";
import { Permission } from "../permissions/types";

interface Organisation {
  organisation_name: string;
  organisation_unique_id: string;
  id: number;
  permissions: Permission[];
  lead_applicant_email: string;
  registries: {
    user: User;
  }[];
}

type OrganisationResponse = Organisation;

interface OrganisationsResponse {
  data: Organisation[];
}

export type { OrganisationsResponse, OrganisationResponse, Organisation };
