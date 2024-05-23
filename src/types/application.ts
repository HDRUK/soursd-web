import { ROUTES } from "@/consts/router";

interface ApplicationDataState {
  routes: Record<
    keyof typeof ROUTES,
    {
      key: string;
      path: string;
    }
  >;
}

export type { ApplicationDataState };
