"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { UserGroup } from "@/consts/user";
import { getUserQuery } from "@/services/users";
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
  const { data: user, isPending, isFetched } = useQuery(getUserQuery(+id));

  if (user?.data.user_group !== UserGroup.USERS && isFetched) {
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
