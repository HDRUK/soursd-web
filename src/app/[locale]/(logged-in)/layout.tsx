"use client";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { handleLogin } from "@/utils/keycloak";
import { getRoutes } from "@/utils/router";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type LayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

async function validateAccessToken(pathname: string | null): Promise<boolean> {
  const accessToken = Cookies.get("access_token");

  if (!accessToken) {
    Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
    handleLogin();
    return false;
  }
  return true;
}

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);
  const pathname = usePathname();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const performAuthCheck = async () => {
      const isAuth = await validateAccessToken(pathname);

      if (!isAuth) {
        throw new Error("Unauthorised 401");
      }

      setIsChecked(isAuth);
    };

    performAuthCheck();
  }, [pathname]);

  return (
    isChecked && (
      <ApplicationDataProvider
        value={{
          routes,
          systemConfigData: {},
        }}>
        {children}
      </ApplicationDataProvider>
    )
  );
}
