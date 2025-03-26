type PostProjectDetailsFromGatewayPayload = {
  custodian_id: number;
  project_id: number;
};

type PostProjectDetailsPayload = ProjectDetails;

type PutProjectDetailsPayload = Partial<ProjectDetails>;

interface ProjectDetails {
  id: number;
  project_id: number;
  datasets?: string[];
  other_approval_committees?: string[];
  data_sensitivity_level?: string;
  legal_basis_for_data_article6?: string;
  duty_of_confidentiality: boolean;
  national_data_optout: boolean;
  request_frequency?: RequestFrequency;
  dataset_linkage_description?: string;
  data_minimisation?: string;
  data_use_description?: string;
  access_date?: string;
  data_privacy?: string;
  research_outputs?: string[];
  data_assets?: string;
}

export enum RequestFrequency {
  ONE_OFF = "ONE-OFF",
  RECURRING = "RECURRING",
}

type PostProjectDetailsFromGatewayResponse = ProjectDetails;

type PostProjectDetailsResponse = { id: number };

type PutProjectDetailsResponse = { id: number };

type ProjectDetailsResponse = ProjectDetails;

export type {
  PostProjectDetailsFromGatewayPayload,
  PostProjectDetailsPayload,
  ProjectDetails,
  PostProjectDetailsFromGatewayResponse,
  PostProjectDetailsResponse,
  ProjectDetailsResponse,
  PutProjectDetailsPayload,
  PutProjectDetailsResponse,
};
