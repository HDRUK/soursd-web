"use client";

import { ROUTES } from "@/consts/router";
import {
  Custodian,
  Organisation,
  Permission,
  ResearcherAffiliation,
  ResearcherAccreditation,
  ResearcherEducation,
  ResearcherEmployment,
  ResearcherProject,
  ResearcherTraining,
  Sector,
  User,
  ResearcherProfessionalRegistration,
} from "@/types/application";
import { Routes } from "@/types/router";
import { produce } from "immer";
import { create } from "zustand";

export interface StoreUserHistories {
  employments: ResearcherEmployment[];
  training: ResearcherTraining[];
  education: ResearcherEducation[];
  approvedProjects: ResearcherProject[];
  accreditations: ResearcherAccreditation[];
  affiliations: ResearcherAffiliation[];
  professionalRegistrations: ResearcherProfessionalRegistration[];
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
  };
  setRoutes: (routes: Routes) => void;
  getUser: () => User | undefined;
  setUser: (user: User) => void;
  getSectors: () => Sector[];
  setSectors: (sectors: Sector[]) => void;
  getPermissions: () => Permission[];
  setPermissions: (permissions: Permission[]) => void;
  getHistories: () => StoreUserHistories | undefined;
  setHistories: (histories: StoreUserHistories) => void;
  getOrganisation: () => Organisation | undefined;
  setOrganisation: (organisation: Organisation | undefined) => void;
  getCustodian: () => Custodian | undefined;
  setCustodian: (organisation: Custodian | undefined) => void;
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
  setOrganisation: (organisation: Organisation | undefined) =>
    set(
      produce(state => {
        state.config.organisation = organisation;
      })
    ),
  getOrganisation: () => {
    return get().config.organisation;
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
  },
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

export { useStore, useStoreHelpers, storeMethods };
export type { StoreState };
