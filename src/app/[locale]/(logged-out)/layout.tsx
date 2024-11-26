"use client";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { getRoutes } from "@/utils/router";
import { PropsWithChildren, useEffect, useState } from "react";
import Loading from "../loading";

type LayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <ApplicationDataProvider
      value={{
        routes,
        systemConfigData: {},
      }}>
      {children}
    </ApplicationDataProvider>
  );
}
