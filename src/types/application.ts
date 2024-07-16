import { ROUTES } from "@/consts/router";
import { User } from "@/services/auth/types";

interface ApplicationDataState {
  routes: Record<
    keyof typeof ROUTES,
    {
      key: string;
      path: string;
    }
  >;
  user?: User;
}

type Approval = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  contact_email: string;
  enabled: boolean;
  invite_accepted_at: string | null;
  invite_sent_at: string | null;
  pivot: {
    organisation_id: number;
    issuer_id: number;
  };
};

export type { ApplicationDataState, Approval };
