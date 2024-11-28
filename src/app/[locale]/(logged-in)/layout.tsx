import { ROUTES } from "@/consts/router";
import { ApplicationDataAuth } from "@/context/ApplicationData/ApplicationDataAuth";
import { getRoutes } from "@/utils/router";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

export default async function Layout({
  children,
  params: { locale },
}: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);

  return (
    <ApplicationDataAuth
      value={{
        routes,
        systemConfigData: {},
      }}>
      {children}
    </ApplicationDataAuth>
  );
}
