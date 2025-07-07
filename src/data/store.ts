"use client";

import { ROUTES } from "@/consts/router";
import {
  Custodian,
  Histories,
  Organisation,
  Permission,
  ProjectOrganisation,
  ProjectRole,
  ProjectUser,
  ResearcherProject,
  Sector,
  User,
} from "@/types/application";
import { Routes } from "@/types/router";
import { produce } from "immer";
import { create } from "zustand";

export type StoreUserHistories = Histories;

export interface StoreApplication {
  routes: Record<
    keyof typeof ROUTES,
    {
      path: string;
    }
  >;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  system: Record<string, any>;
}
type StoreSet = (
  partial:
    | StoreState
    | Partial<StoreState>
    | ((state: StoreState) => StoreState | Partial<StoreState>),
  replace?: boolean | undefined
) => void;

type StoreGet = () => StoreState;

interface StoreState {
  config: {
    router: {
      history: string[];
      entries: Routes;
    };
    user?: User;
    organisation?: Organisation;
    sectors: Sector[];
    permissions: Permission[];
    custodian?: Custodian;
    histories?: StoreUserHistories;
    projectRoles?: ProjectRole[];
  };
  current: {
    project?: ResearcherProject;
    organisation?: Organisation;
    user?: User;
    projectUser?: ProjectUser;
    projectOrganisation?: ProjectOrganisation;
  };
  application: StoreApplication;
  setRoutes: (routes: Routes) => void;
  getCurrentProject: () => ResearcherProject;
  setCurrentProject: (project: ResearcherProject) => void;
  getCurrentUser: () => User;
  setCurrentUser: (user: User) => void;
  getCurrentProjectUser: () => ProjectUser;
  setCurrentProjectUser: (projectUser: ProjectUser) => void;
  getCurrentProjectOrganisation: () => ProjectUser;
  setCurrentProjectOrganisation: (
    projectOrganisation: ProjectOrganisation
  ) => void;
  getCurrentOrganisation: () => Organisation;
  setCurrentOrganisation: (organisation: Organisation) => void;
  getUser: () => User | undefined;
  setUser: (user: User) => void;
  getSectors: () => Sector[];
  setSectors: (sectors: Sector[]) => void;
  getPermissions: () => Permission[];
  setPermissions: (permissions: Permission[]) => void;
  getProjectRoles: () => ProjectRole[];
  setProjectRoles: (projectRoles: ProjectRole[]) => void;
  getHistories: () => StoreUserHistories | undefined;
  setHistories: (histories: StoreUserHistories) => void;
  getOrganisation: () => Organisation | undefined;
  setOrganisation: (organisation: Organisation | undefined) => void;
  getCustodian: () => Custodian | undefined;
  setCustodian: (organisation: Custodian | undefined) => void;
  getApplication: () => StoreApplication;
  setApplication: (application: StoreApplication) => void;
  getPreviousUrl: () => string | null;
  addUrlToHistory: (url: string) => void;
}

const storeMethods = (set: StoreSet, get: StoreGet) => ({
  getPreviousUrl: () => {
    const {
      router: { history },
    } = get().config;

    return history.length > 1 ? history[history.length - 2] : null;
  },
  setRoutes: (routes: Routes) =>
    set(
      produce(state => {
        state.config.entries = routes;
      })
    ),
  setCurrentProject: (project: ResearcherProject) =>
    set(
      produce(state => {
        state.current.project = project;
      })
    ),
  getCurrentProject: () => {
    return get().current.project;
  },
  setCurrentUser: (user: User) =>
    set(
      produce(state => {
        state.current.user = user;
      })
    ),
  getCurrentUser: () => {
    return get().current.user;
  },
  setCurrentProjectUser: (projectUser: ProjectUser) =>
    set(
      produce(state => {
        state.current.projectUser = projectUser;
      })
    ),
  getCurrentProjectUser: () => {
    return get().current.projectUser;
  },
  setCurrentOrganisation: (organisation: Organisation) =>
    set(
      produce(state => {
        state.current.organisation = organisation;
      })
    ),
  getCurrentOrganisation: () => {
    return get().current.organisation;
  },
  setCurrentProjectOrganisation: (projectOrganisation: ProjectOrganisation) =>
    set(
      produce(state => {
        state.current.projectOrganisation = projectOrganisation;
      })
    ),
  getCurrentProjectOrganisation: () => {
    return get().current.projectOrganisation;
  },
  setUser: (user: User) =>
    set(
      produce(state => {
        state.config.user = user;
      })
    ),
  getUser: () => {
    return get().config.user;
  },
  setHistories: (histories: StoreUserHistories) =>
    set(
      produce(state => {
        state.config.histories = histories;
      })
    ),
  getHistories: () => {
    return get().config.histories;
  },
  setSectors: (sectors: Sector[]) =>
    set(
      produce(state => {
        state.config.sectors = sectors;
      })
    ),
  getSectors: () => {
    return get().config.sectors;
  },
  setPermissions: (permissions: Permission[]) =>
    set(
      produce(state => {
        state.config.permissions = permissions;
      })
    ),
  getPermissions: () => {
    return get().config.permissions;
  },
  setProjectRoles: (projectRoles: ProjectRole[]) =>
    set(
      produce(state => {
        state.config.projectRoles = projectRoles;
      })
    ),
  getProjectRoles: () => {
    return get().config.projectRoles;
  },
  setOrganisation: (organisation: Organisation | undefined) =>
    set(
      produce(state => {
        state.config.organisation = organisation;
      })
    ),
  getOrganisation: () => {
    return get().config.organisation;
  },
  setApplication: (application: StoreApplication) =>
    set(
      produce(state => {
        state.application = application;
      })
    ),
  getApplication: () => {
    return get().application;
  },
  setCustodian: (custodian: Custodian | undefined) =>
    set(
      produce(state => {
        state.config.custodian = custodian;
      })
    ),
  getCustodian: () => {
    return get().config.custodian;
  },
  addUrlToHistory: (url: string) =>
    set(
      produce(state => {
        state.config.router.history.push(url);
      })
    ),
});

const useStore = create<StoreState>((set, get) => ({
  config: {
    router: {
      history: [],
      entries: ROUTES,
    },
    permissions: [],
    sectors: [],
    roles: [],
  },
  current: {},
  application: { routes: ROUTES, system: { PER_PAGE: { value: 25 } } },
  ...storeMethods(set, get),
}));

const useStoreHelpers = () => {
  const helpers = useStore(
    ({ setRoutes, getPreviousUrl, addUrlToHistory }) => ({
      getPreviousUrl,
      setRoutes,
      addUrlToHistory,
    })
  );

  return helpers;
};

export { storeMethods, useStore, useStoreHelpers };
export type { StoreState };
