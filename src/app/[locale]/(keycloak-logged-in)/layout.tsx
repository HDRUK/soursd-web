"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import useLoginRedirect from "@/hooks/useLoginRedirect";
import { usePathname } from "@/i18n/routing";
import { PageContainer } from "@/modules";
import { getAccessToken } from "@/services/requestHelpers";
import { handleLogin } from "@/utils/keycloak";
import Cookies from "js-cookie";
import { PropsWithChildren, useEffect, useState } from "react";

async function validateAccessToken(pathname: string | null): Promise<boolean> {
  const accessToken = await getAccessToken();

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

  const { isReady } = useLoginRedirect();

  useEffect(() => {
    const performAuthCheck = async () => {
      const isAuth = await validateAccessToken(pathname);

      setHasAccessToken(isAuth);
    };

    performAuthCheck();
  }, [pathname]);

  return (
    <PageContainer>
      <LoadingWrapper variant="basic" loading={isReady && hasAccessToken}>
        {children}
      </LoadingWrapper>
    </PageContainer>
  );
}
