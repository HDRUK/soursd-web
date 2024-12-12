"use client";

import { ROUTES } from "@/consts/router";
import { Custodian, Organisation, Sector, User } from "@/types/application";
import { Routes } from "@/types/router";
import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  config: {
    router: {
      history: string[];
      entries: Routes;
    };
    user?: User;
    organisation?: Organisation;
    sectors?: Sector[];
    custodian?: Custodian;
  };
  setRoutes: (routes: Routes) => void;
  getUser: () => User | undefined;
  setUser: (user: User) => void;
  getSectors: () => Sector[] | undefined;
  setSectors: (sectors: Sector[]) => void;
  getOrganisation: () => Organisation | undefined;
  setOrganisation: (organisation: Organisation | undefined) => void;
  getCustodian: () => Custodian | undefined;
  setCustodian: (organisation: Custodian | undefined) => void;
  getPreviousUrl: () => string | null;
  addUrlToHistory: (url: string) => void;
}

const useStore = create<StoreState>((set, get) => ({
  config: {
    router: {
      history: [],
      entries: ROUTES,
    },
  },
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
  setSectors: (sectors: Sector[]) =>
    set(
      produce(state => {
        state.config.sectors = sectors;
      })
    ),
  getSectors: () => {
    return get().config.sectors;
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

export { useStore, useStoreHelpers };
export type { StoreState };
