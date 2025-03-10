import { ResearcherProject, ProjectUser } from "@/types/application";

type ProjectsResponse = ResearcherProject[];

type ProjectResponse = ResearcherProject;

type ProjectUsersResponse = ProjectUser[];

type DeleteProjectUserPayload = {
  projectId: number;
  registryId: number;
};

export type {
  ProjectsResponse,
  ProjectUsersResponse,
  ProjectResponse,
  DeleteProjectUserPayload,
};
