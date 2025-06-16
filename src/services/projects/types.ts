import { Status } from "../../components/ChipStatus";
import {
  ProjectAllUser,
  ProjectDetails,
  ResearcherProject,
} from "../../types/application";

type ProjectsResponse = ResearcherProject[];

type ProjectResponse = ResearcherProject;

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
type PutProjectDetailsPayload = ProjectDetails;
type PutProjectDetailsResponse = number;

type ProjectDetailsResponse = ProjectDetails;

export type {
  DeleteProjectUserPayload,
  PostProjectUsersResponse,
  ProjectAllUserResponse,
  ProjectDetailsResponse,
  ProjectResponse,
  ProjectsResponse,
  PutPrimaryContactPayload,
  PutPrimaryContactQuery,
  PutProjectDetailsPayload,
  PutProjectDetailsResponse,
  PutProjectPayload,
  PutProjectResponse,
  PutProjectUsersPayload,
};
