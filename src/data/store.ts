"use client";

import { ROUTES } from "@/consts/router";
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
  };
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
  addUrlToHistory: (url: string) =>
    set(
      produce(state => {
        state.config.router.history.push(url);
      })
    ),
}));

const useStoreHelpers = () => {
  const helpers = useStore(({ setRoutes, addUrlToHistory }) => ({
    setRoutes,
    addUrlToHistory,
  }));

  return helpers;
};

export { useStore, useStoreHelpers };
export type { StoreState };
