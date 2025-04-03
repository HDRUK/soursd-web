"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { getCustodianUserQuery } from "@/services/custodian_users";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPageUsers from "../../../components/SubPageUsers";
import { UserSubTabs } from "../../../consts/tabs";

interface UsersSubPageProps {
  params: {
    subTabId: UserSubTabs;
    id: number;
  };
}

function UsersSubPage({ params: { subTabId, id } }: UsersSubPageProps) {
  const { data: user, isPending, isFetched } = useQuery(getCustodianUserQuery(+id));

  if (!user?.data && isFetched) {
    notFound();
  }

  return (
    <LoadingWrapper variant="basic" loading={isPending}>
      {user?.data && (
        <SubPageUsers
          userData={user.data}
          params={{
            subTabId,
            id,
          }}
        />
      )}
    </LoadingWrapper>
  );
}

export default UsersSubPage;
