"use client";

import { ROUTES } from "@/consts/router";
import { User } from "@/services/auth/types";
import { RouteConfig } from "@/types/router";
import { produce } from "immer";
import { create } from "zustand";

interface StoreRoutesEntries {
  login: RouteConfig;
  signup: RouteConfig;
  signupIssuer: RouteConfig;
  homepage: RouteConfig;
  profileIssuer: RouteConfig;
}

interface StoreState {
  config: {
    router: {
      history: string[];
      entries: StoreRoutesEntries;
    };
    user?: User;
  };
  setUser: (user: User) => void;
  setRoutes: (routes: StoreRoutesEntries) => void;
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
  setRoutes: (routes: StoreRoutesEntries) =>
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
  addUrlToHistory: (url: string) =>
    set(
      produce(state => {
        state.config.router.history.push(url);
      })
    ),
}));

const useStoreHelpers = () => {
  const helpers = useStore(
    ({ setUser, setRoutes, getPreviousUrl, addUrlToHistory }) => ({
      setUser,
      getPreviousUrl,
      setRoutes,
      addUrlToHistory,
    })
  );

  return helpers;
};

export { useStore, useStoreHelpers };
export type { StoreState };
