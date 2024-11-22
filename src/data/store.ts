"use client";

import { ROUTES } from "@/consts/router";
import { Auth, Issuer, Organisation, User } from "@/types/application";
import { Routes } from "@/types/router";
import { produce } from "immer";
import { create } from "zustand";

interface StoreState {
  config: {
    router: {
      history: string[];
      entries: Routes;
    };
    auth?: Auth;
    organisation?: Organisation;
    issuer?: Issuer;
  };
  setAuth: (auth: Auth) => void;
  setRoutes: (routes: Routes) => void;
  getUser: () => User | undefined;
  setUser: (user: User) => void;
  getOrganisation: () => Organisation | undefined;
  setOrganisation: (organisation: Organisation) => void;
  getIssuer: () => Issuer | undefined;
  setIssuer: (organisation: Issuer) => void;
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
  setAuth: (auth: Auth) =>
    set(
      produce(state => {
        state.config.auth = auth;
      })
    ),
  setUser: (user: User) =>
    set(
      produce(state => {
        state.config.auth.user = user;
      })
    ),
  getUser: () => {
    return get().config.auth?.user;
  },
  setOrganisation: (organisation: Organisation) =>
    set(
      produce(state => {
        state.config.organisation = organisation;
      })
    ),
  getOrganisation: () => {
    return get().config.organisation;
  },
  setIssuer: (issuer: Issuer) =>
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
    ({ setAuth, setRoutes, getPreviousUrl, addUrlToHistory }) => ({
      setAuth,
      getPreviousUrl,
      setRoutes,
      addUrlToHistory,
    })
  );

  return helpers;
};

export { useStore, useStoreHelpers };
export type { StoreState };
