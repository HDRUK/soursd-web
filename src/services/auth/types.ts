import { Auth, User } from "@/types/application";
import { AccountType } from "@/types/accounts";

type LoginRequest = Record<string, string>;

type LoginResponse = Auth;

interface PostRegisterPayload {
  account_type: AccountType;
}

type PostRegisterResponse = User;

export type {
  LoginRequest,
  LoginResponse,
  PostRegisterResponse,
  PostRegisterPayload,
};
