import { User } from "../auth/types";

interface ResearcherInviteResponse {
  name: string;
  contact_email: string;
  invite_sent_at: string;
  invite_accepted_at: string;
  enabled: number;
  organisation_id: number;
}

interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}

interface UpdateUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  email_verified_at: string;
}

type UserResponse = User;

export type {
  ResearcherInviteResponse,
  UpdateUserPayload,
  UpdateUserResponse,
  UserResponse,
};
