import { ROUTES } from "@/consts/router";

interface ApplicationDataState {
  signup?: {
    complete: boolean;
  };
  routes: Record<
    keyof typeof ROUTES,
    {
      path: string;
    }
  >;
}

export type { ApplicationDataState };
