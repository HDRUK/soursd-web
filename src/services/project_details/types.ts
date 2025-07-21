import { ProjectDetails } from "@/types/application";
import { DataUse } from "@/types/gateway";

type PostProjectDetailsFromGatewayPayload = {
  custodian_id: number;
  project_id: number;
};

type PostProjectDetailsPayload = Omit<ProjectDetails, "id">;

type PutProjectDetailsPayload = Omit<Partial<ProjectDetails>, "datasets"> & {
  datasets: { value: string }[];
};

type PostProjectDetailsFromGatewayResponse = DataUse[];

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
