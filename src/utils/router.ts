// Navigation at this point essentially unknown
export const getMainNavigationLinks = (locale: string) => [
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
