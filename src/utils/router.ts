// Navigation at this point essentially unknown

import { ROUTES } from "@/consts/router";
import { RoleConfig } from "@/types/roles";

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

function getRoutes(routes: typeof ROUTES, locale: string) {
  const clonedRoutes = JSON.parse(JSON.stringify(routes));

  (Object.keys(clonedRoutes) as Array<keyof typeof clonedRoutes>).forEach(
    key => {
      clonedRoutes[key].path = `/${locale}${clonedRoutes[key].path}`;
    }
  );

  return clonedRoutes;
}

export { getRoutes, getMainNavigationLinks };
