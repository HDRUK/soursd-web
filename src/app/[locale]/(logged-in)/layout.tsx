"use client";

import { ROUTES } from "@/consts/router";
import { UserGroup } from "@/consts/user";
import Application from "@/modules/Application";
import { usePathname, useRouter } from "@/i18n/routing";
import { PageContainer } from "@/modules";
import { getMe } from "@/services/auth";
import { getCustodianUser } from "@/services/custodian_users";
import { getAccessToken } from "@/services/requestHelpers";
import { User } from "@/types/application";
import { handleLogin } from "@/utils/keycloak";
import Cookies from "js-cookie";
import { PropsWithChildren, useEffect, useState } from "react";
import usePathServerSide from "@/hooks/usePathServerSide";
import ProtectedRoute from "@/modules/ProtectedRoute";

type LayoutProps = PropsWithChildren;

async function getCustodianId(user: User) {
  let custodian_id = user?.custodian_id;

  if (user.custodian_user_id) {
    const custodianUser = await getCustodianUser(user.custodian_user_id);

    custodian_id = custodianUser?.data.custodian_id;
  }

  return custodian_id;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathServerSide();

  return (
    <ProtectedRoute pathname={pathname}>
      {async ({ me }) => {
        const custodianId = await getCustodianId(me);

        return (
          <Application
            custodianId={custodianId}
            organisationId={me?.organisation_id}
            me={me}>
            <PageContainer>{children}</PageContainer>
          </Application>
        );
      }}
    </ProtectedRoute>
  );
}
