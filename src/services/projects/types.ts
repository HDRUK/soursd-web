import { ResearcherProject, ProjectUser } from "@/types/application";

type ProjectsResponse = ResearcherProject[];

type ProjectResponse = ResearcherProject;

type ProjectUsersResponse = ProjectUser[];

type DeleteProjectUserPayload = {
  projectId: number;
  registryId: number;
};

interface PutPrimaryContactQuery {
  projectId: number;
  registryId: number;
  primaryContact: boolean;
}

interface PutPrimaryContactPayload {
  primary_contact: boolean;
}

type PutProjectPayload = ResearcherProject;

export type {
  ProjectsResponse,
  ProjectUsersResponse,
  ProjectResponse,
  DeleteProjectUserPayload,
  PutPrimaryContactPayload,
  PutPrimaryContactQuery,
  PutProjectPayload,
};
