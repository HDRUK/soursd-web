// Navigation at this point essentially unknown

import { RoleConfig } from "@/types/roles";

export const getMainNavigationLinks = (
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
