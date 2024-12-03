"use client";

import { ROUTES } from "@/consts/router";
import { ApplicationDataProvider } from "@/context/ApplicationData";
import { useStore } from "@/data/store";
import { getRequest } from "@/services/requests";
import { User } from "@/types/application";
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
): Promise<User | undefined> {
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
    return response.json();
  }

  if (response.status === 404) {
    router.push("/en/register");
  }

  if (response.status === 500) {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      Cookies.set("redirectPath", pathname ?? "/", { path: "/" });
      handleLogin();
    }
  }
}

export default function Layout({ children, params: { locale } }: LayoutProps) {
  const routes = getRoutes(ROUTES, locale);
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useStore(state => [state.getUser(), state.setUser]);

  useEffect(() => {
    const performAuthCheck = async () => {
      const response = await validateAccessToken(pathname, router);

      if (!response?.data) {
        throw new Error("Unauthorised 401");
      }

      setUser(response.data);
    };

    performAuthCheck();
  }, [pathname]);

  return (
    user?.id && (
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
