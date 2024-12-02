"use client";

import { ROUTES } from "@/consts/router";
import { Issuer, Organisation, User } from "@/types/application";
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
    issuer?: Issuer;
  };
  setRoutes: (routes: Routes) => void;
  getUser: () => User | undefined;
  setUser: (user: User) => void;
  getOrganisation: () => Organisation | undefined;
  setOrganisation: (organisation: Organisation | undefined) => void;
  getIssuer: () => Issuer | undefined;
  setIssuer: (organisation: Issuer | undefined) => void;
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
  setOrganisation: (organisation: Organisation | undefined) =>
    set(
      produce(state => {
        state.config.organisation = organisation;
      })
    ),
  getOrganisation: () => {
    return get().config.organisation;
  },
  setIssuer: (issuer: Issuer | undefined) =>
    set(
      produce(state => {
        state.config.issuer = issuer;
      })
    ),
  getIssuer: () => {
    return get().config.issuer;
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
