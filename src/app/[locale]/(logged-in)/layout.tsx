"use client";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { getRequest } from "@/services/requests";
import { handleLogin } from "@/utils/keycloak";
import { getRoutes } from "@/utils/router";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type LayoutProps = PropsWithChildren<{
  params: { locale: string };
}>;

async function validateAccessToken(
  pathname: string | null,
  router: ReturnType<typeof useRouter>
): Promise<boolean> {
  const response = await getRequest(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
    undefined,
    {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    }
  );

  if (response.ok) {
    return true;
  }

  if (response.status === 404) {
    router.push("/en/register");
    return false;
  }

  if (response.status === 500) {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
      handleLogin();
    }
    return false;
  }
  return false;
}

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const performAuthCheck = async () => {
      const isAuth = await validateAccessToken(pathname, router);
      setIsLoggedIn(isAuth);
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
