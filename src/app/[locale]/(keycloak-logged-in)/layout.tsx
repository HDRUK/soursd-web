"use client";

import { handleLogin } from "@/utils/keycloak";
import Cookies from "js-cookie";
import { usePathname } from "@/i18n/routing";
import { PropsWithChildren, useEffect, useState } from "react";

async function validateAccessToken(pathname: string | null): Promise<boolean> {
  const accessToken = Cookies.get("access_token");

  if (!accessToken) {
    Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
    handleLogin();
    return false;
  }
  return true;
}

export default function Layout({ children }: PropsWithChildren) {
  // temporary layout for if someone is keycloak-logged-in and needs to create an account
  const pathname = usePathname();
  const [hasAccessToken, setHasAccessToken] = useState<boolean>(false);

  useEffect(() => {
    const performAuthCheck = async () => {
      const isAuth = await validateAccessToken(pathname);
      setHasAccessToken(isAuth);
    };

    performAuthCheck();
  }, [pathname]);

  return hasAccessToken && children;
}
