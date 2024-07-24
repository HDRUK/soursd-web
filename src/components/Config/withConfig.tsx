import { ROUTES } from "@/consts/router";
import { Routes } from "@/types/router";
import { useLocale } from "next-intl";
import { useMemo } from "react";

export interface ConfigProps {
  config: {
    routes: Routes;
  };
}

export default function withConfig<T>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    const locale = useLocale();

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
