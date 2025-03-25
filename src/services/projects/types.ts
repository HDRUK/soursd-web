import { Status } from "@/components/ChipStatus";
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

interface PutProjectPayload extends Omit<ResearcherProject, "model_state"> {
  status?: Status;
}

type PutProjectResponse = ResearcherProject;

type PostProjectUsersResponse = ResearcherProject;

interface PostProjectUsersPayload {
  users: { user_digital_ident: string; project_role_id: number }[];
}

export type {
  ProjectsResponse,
  ProjectUsersResponse,
  ProjectResponse,
  DeleteProjectUserPayload,
  PutPrimaryContactPayload,
  PutPrimaryContactQuery,
  PutProjectPayload,
  PutProjectResponse,
  PostProjectUsersPayload,
  PostProjectUsersResponse,
};
