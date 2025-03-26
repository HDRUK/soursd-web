import { ProjectDetails } from "@/types/application";

type PostProjectDetailsFromGatewayPayload = {
  custodian_id: number;
  project_id: number;
};

type PostProjectDetailsPayload = Omit<ProjectDetails, "id">;

type PutProjectDetailsPayload = Partial<ProjectDetails>;

type PostProjectDetailsFromGatewayResponse = ProjectDetails;

type PostProjectDetailsResponse = { id: number };

type PutProjectDetailsResponse = { id: number };


type ProjectDetailsResponse = ProjectDetails;

export type {
  PostProjectDetailsFromGatewayPayload,
  PostProjectDetailsPayload,
  PostProjectDetailsFromGatewayResponse,
  PostProjectDetailsResponse,
  ProjectDetailsResponse,
  PutProjectDetailsPayload,
  PutProjectDetailsResponse,
};
