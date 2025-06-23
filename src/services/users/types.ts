import { UserProvider, UserHistoryLog } from "@/consts/user";
import { ResearcherProject, User } from "@/types/application";

type PatchUserPayload = Partial<User>;
type PutUserPayload = Partial<User>;

interface UpdatePermissonsPayload {
  user_id: number;
  custodian_id: number;
  permissions: number[];
}

interface PatchUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: string;
}

type PutUserResponse = User;

type UserResponse = User;

type UsersResponse = User[];

type UserProjectsResponse = ResearcherProject[];

type GetUserProjectsResponse = ResearcherProject[];

interface PostUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  consent_scrape: boolean;
  registry_id?: string;
  provider?: UserProvider;
  profile_steps_completed?: string;
  profile_completed_at?: string;
  is_researcher?: boolean;
  is_organisation?: boolean;
}

interface PostUserInvitePayload {
  first_name: string;
  last_name: string;
  email: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
type PostUserResponse = any;

type PostUserInviteResponse = User;

interface UserHistory {
  id: number;
  description: string;
  event: UserHistoryLog;
  log_name: string;
  properties: Record<string, Record<string, string>>;
  created_at: string;
  updated_at: string;
  subject_type: string;
  subject: Partial<User>;
  causer: Partial<User>;
}

export type {
  PostUserPayload,
  PostUserResponse,
  UpdatePermissonsPayload,
  PatchUserPayload,
  PatchUserResponse,
  UserResponse,
  UsersResponse,
  PostUserInviteResponse,
  PostUserInvitePayload,
  PutUserResponse,
  PutUserPayload,
  UserProjectsResponse,
  UserHistory,
  GetUserProjectsResponse,
};
