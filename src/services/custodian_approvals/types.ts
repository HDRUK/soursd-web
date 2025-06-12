import { ProjectUser, WithModelState } from "../../types/application";

type WorkflowResponse = Record<string, string[]>;

type ProjectUsersResponse = WithModelState<{
  project_has_user: ProjectUser[];
}>;

type PutUserStatusPayload = {
  status: string;
};

type PutUserStatusParams = {
  custodianId: number;
  id: number;
};

export type {
  WorkflowResponse,
  ProjectUsersResponse,
  PutUserStatusPayload,
  PutUserStatusParams,
};
