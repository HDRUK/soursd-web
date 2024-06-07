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

export type { ApplicationDataState };
