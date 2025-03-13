"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { usePathname } from "@/i18n/routing";
import { getMe } from "@/services/auth";
import { User } from "@/types/application";
import {
  redirectOnServerError,
  redirectRefreshToken,
  redirectToProfile,
  redirectWithoutAccessToken,
  registerAndRedirect,
} from "@/utils/requests";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ApplicationRedirectProps {
  children: ReactNode;
  onMeFetched?: (me: User | undefined) => void;
}

export default function ApplicationRedirect({
  children,
  onMeFetched,
}: ApplicationRedirectProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const init = async () => {
      const accessToken = await redirectWithoutAccessToken(router, pathname);

      if (!accessToken) {
        setFetched(true);

        return;
      }

      const me = await getMe({
        suppressThrow: true,
      });

      if (me.status === 200) {
        onMeFetched?.(me.data);

        redirectToProfile(me.data, pathname);
      } else if (me.status === 401) {
        redirectRefreshToken(router);
      } else if (me.status === 404) {
        registerAndRedirect(pathname);
      } else if (me.status === 500) {
        redirectOnServerError(accessToken, pathname);
      }

      setFetched(true);
    };

    init();
  }, []);

  return (
    <LoadingWrapper variant="basic" loading={!fetched}>
      {children}
    </LoadingWrapper>
  );
}
