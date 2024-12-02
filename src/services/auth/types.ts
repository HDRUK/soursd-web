import { Auth } from "@/types/application";
import { AccountType } from "@/types/accounts";

type LoginRequest = Record<string, string>;

type LoginResponse = Auth;

interface PostRegisterPayload {
  account_type: AccountType;
}

export type { LoginRequest, LoginResponse, PostRegisterPayload };
