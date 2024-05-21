import { RouteConfig } from "./router";

interface ApplicationDataState {
  routes: {
    login: RouteConfig;
    signup: RouteConfig;
    signupIssuer: RouteConfig;
    homepage: RouteConfig;
    profileIssuer: RouteConfig;
  };
}

export type { ApplicationDataState };
