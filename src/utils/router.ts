// Navigation at this point essentially unknown

import { Auth } from "@/types/application";
import { RoleConfig } from "@/types/roles";
import { RouteConfig, Routes } from "@/types/router";

const getMainNavigationLinks = (
  locale: string
): ({ tKey: string; to: string } & RoleConfig)[] => [
  {
    tKey: "Navigation.home",
    to: `/${locale}`,
  },
  {
    tKey: "Navigation.about",
    to: `/${locale}`,
  },
  {
    tKey: "Navigation.features",
    to: `/${locale}`,
  },
  {
    tKey: "Navigation.contact",
    to: `/${locale}`,
  },
];

function getRoutes(routes: Partial<Routes>, locale: string) {
  const clonedRoutes = JSON.parse(JSON.stringify(routes));

  (Object.keys(clonedRoutes) as Array<keyof typeof clonedRoutes>).forEach(
    key => {
      clonedRoutes[key].path = `/${locale}${clonedRoutes[key].path}`;
    }
  );

  return clonedRoutes;
}

function isRouteAllowed(pathname: string | null, routes: Routes, auth: Auth) {
  const currentRoute = Object.values(routes).find((route: RouteConfig) => {
    return route.path === pathname;
  });

  return currentRoute?.permissions
    ? currentRoute.permissions.includes(auth?.user?.user_group)
    : true;
}

export { getMainNavigationLinks, getRoutes, isRouteAllowed };
