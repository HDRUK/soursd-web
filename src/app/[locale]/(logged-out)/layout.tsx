"use client";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { getRoutes } from "@/utils/router";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);
  return (
    <ApplicationDataProvider
      prefetchAuth={false}
      value={{
        routes,
        systemConfigData: {},
      }}>
      {children}
    </ApplicationDataProvider>
  );
}
