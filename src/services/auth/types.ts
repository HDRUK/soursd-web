import { AccountType } from "@/types/accounts";
import { User } from "@/types/application";

type MeResponse = User;

interface PostRegisterPayload {
  account_type: AccountType;
}

type PostRegisterResponse = string | null;

export type { MeResponse, PostRegisterPayload, PostRegisterResponse };
