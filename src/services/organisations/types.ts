interface Organisation {
  organisation_name: string;
  organisation_unique_id: string;
  id: number;
}

interface OrganisationsResponse {
  data: Organisation[];
}

export type { OrganisationsResponse, Organisation };
