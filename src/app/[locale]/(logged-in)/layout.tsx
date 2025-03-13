"use client";

import { UserGroup } from "@/consts/user";
import { PageContainer } from "@/modules";
import Application from "@/modules/Application";
import ApplicationRedirect from "@/modules/ApplicationRedirect";
import { getCustodianUser } from "@/services/custodian_users";
import { User } from "@/types/application";
import { PropsWithChildren, useState } from "react";

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
  const [me, setMe] = useState<User>();
  const [custodianId, setCustodianId] = useState<number>();
  const [organisationId, setOrganisationId] = useState<number>();

  const handleMeFetched = async (user: User | undefined) => {
    if (user) {
      if (user.user_group === UserGroup.CUSTODIANS) {
        setCustodianId(await getCustodianId(user));
      } else if (user.user_group === UserGroup.ORGANISATIONS) {
        setOrganisationId(user.organisation_id);
      }

      setMe(user);
    }
  };

  return (
    <ApplicationRedirect onMeFetched={handleMeFetched}>
      <Application
        custodianId={custodianId}
        organisationId={organisationId}
        me={me}>
        <PageContainer>{children}</PageContainer>
      </Application>
    </ApplicationRedirect>
  );
}
