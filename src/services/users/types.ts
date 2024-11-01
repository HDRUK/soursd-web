import { UserProvider } from "@/consts/user";
import { User } from "@/types/application";

interface ResearcherInviteResponse {
  id: number;
  name: string;
  contact_email: string;
  invite_sent_at: string;
  invite_accepted_at: string;
  enabled: number;
  organisation_id: number;
}

interface PatchUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  consent_scrape?: number;
}

interface UpdatePermissonsPayload {
  user_id: number;
  issuer_id: number;
  permissions: number[];
}

interface PatchUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: string;
}

type UserResponse = User;

type UsersResponse = User[];

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

/* eslint-disable  @typescript-eslint/no-explicit-any */
type PostUserResponse = any;

export type {
  PostUserPayload,
  PostUserResponse,
  ResearcherInviteResponse,
  UpdatePermissonsPayload,
  PatchUserPayload,
  PatchUserResponse,
  UserResponse,
  UsersResponse,
};
