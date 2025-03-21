import { ProjectDetails } from "@/types/application";

type PostProjectDetailsPayload = Omit<ProjectDetails, "id">;
type PostProjectDetailsResponse = ProjectDetails;

type PutProjectDetailsPayload = ProjectDetails;
type PutProjectDetailsResponse = number;

type ProjectDetailsResponse = ProjectDetails;

export type {
  ProjectDetailsResponse,
  PutProjectDetailsPayload,
  PutProjectDetailsResponse,
  PostProjectDetailsPayload,
  PostProjectDetailsResponse,
};
