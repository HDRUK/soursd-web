import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { getRoutes } from "@/utils/router";
import { PropsWithChildren, useMemo } from "react";

type LayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = useMemo(() => getRoutes(ROUTES, locale), [locale]);

  return (
    <ApplicationDataProvider
      loggedIn
      value={{
        routes,
        systemConfigData: {},
      }}>
      {children}
    </ApplicationDataProvider>
  );
}
