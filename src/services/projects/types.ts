import { Status } from "@/components/ChipStatus";
import {
  ResearcherProject,
  ProjectUser,
  ProjectAllUser,
  ProjectDetails,
} from "@/types/application";

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

interface PutProjectUsersPayload {
  users: ProjectAllUser[];
}

type ProjectAllUserResponse = ProjectAllUser[];

export type {
  ProjectsResponse,
  ProjectAllUserResponse,
  ProjectUsersResponse,
  ProjectResponse,
  DeleteProjectUserPayload,
  PutPrimaryContactPayload,
  PutPrimaryContactQuery,
  PutProjectPayload,
  PutProjectResponse,
  PutProjectUsersPayload,
  PostProjectUsersResponse,
};
