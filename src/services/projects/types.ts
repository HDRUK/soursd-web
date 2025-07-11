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
type PutProjectDetailsPayload = ProjectDetails;
type PutProjectDetailsResponse = number;

type ProjectDetailsResponse = ProjectDetails;

export type {
  ProjectsResponse,
  ProjectAllUserResponse,
  ProjectUsersResponse,
  ProjectResponse,
  PutPrimaryContactPayload,
  PutPrimaryContactQuery,
  PutProjectPayload,
  PutProjectResponse,
  PutProjectUsersPayload,
  PostProjectUsersResponse,
  PutProjectDetailsPayload,
  PutProjectDetailsResponse,
  ProjectDetailsResponse,
};
