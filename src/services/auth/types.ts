import { AccountType } from "../../types/accounts";
import { User } from "../../types/application";

type MeResponse = User;

interface PostRegisterPayload {
  account_type: AccountType;
  organisation_id?: number;
}

type PostRegisterResponse = User | null;

export type { MeResponse, PostRegisterPayload, PostRegisterResponse };
