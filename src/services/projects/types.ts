import { ResearcherProject, ProjectUser } from "@/types/application";

type ProjectsResponse = ResearcherProject[];

type ProjectResponse = ResearcherProject;

type ProjectUsersResponse = ProjectUser[];

type DeleteProjectUserPayload = {
  projectId: number;
  userDigitalIdent: string;
};

export type {
  ProjectsResponse,
  ProjectUsersResponse,
  ProjectResponse,
  DeleteProjectUserPayload,
};
