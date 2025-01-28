import { UserProvider } from "@/consts/user";
import { User } from "@/types/application";

type PatchUserPayload = Partial<User>;

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

interface PostUserInvitePayload {
  first_name: string;
  last_name: string;
  email: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
type PostUserResponse = any;

type PostUserInviteResponse = User;

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
};
