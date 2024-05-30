interface Organisation {
  organisation_name: string;
  organisation_unique_id: string;
  id: number;
}

type OrganisationsResponse = Organisation[];

export type { OrganisationsResponse, Organisation };
