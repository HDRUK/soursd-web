// Navigation at this point essentially unknown

import { Routes } from "@/types/router";

function getRoutes(routes: Partial<Routes>, locale: string = "en") {
  const clonedRoutes = JSON.parse(JSON.stringify(routes));

  (Object.keys(clonedRoutes) as Array<keyof typeof clonedRoutes>).forEach(
    key => {
      clonedRoutes[key].path = `/${locale}${clonedRoutes[key].path}`;
    }
  );

  return clonedRoutes;
}

export { getRoutes };
