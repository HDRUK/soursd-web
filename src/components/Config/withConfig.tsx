import { ROUTES } from "@/consts/router";
import { useMemo } from "react";
import { getLocale } from "next-intl/server";

export default function withConfig<T>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    const locale = getLocale();

    const routes = useMemo(() => {
      const clonedRoutes = JSON.parse(JSON.stringify(ROUTES));

      (Object.keys(clonedRoutes) as Array<keyof typeof clonedRoutes>).forEach(
        key => {
          clonedRoutes[key].path = `/${locale}${clonedRoutes[key].path}`;
        }
      );

      return clonedRoutes;
    }, [locale]);

    return (
      <WrappedComponent
        {...(props as T & JSX.IntrinsicAttributes)}
        config={{ routes }}
      />
    );
  };
}
