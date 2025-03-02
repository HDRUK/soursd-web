"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { getUserQuery } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import SubPage from "../../../components/SubPage";
import { PageTabs, UserSubTabs } from "../../../consts/tabs";

interface UsersSubPageProps {
  params: {
    id: number;
  };
}

function UsersSubPage({ params: { id } }: UsersSubPageProps) {
  const { data: user, isPending, isFetched } = useQuery(getUserQuery(id));

  if (!user?.data && isFetched) {
    notFound();
  }

  return (
    <LoadingWrapper variant="basic" loading={isPending}>
      <SubPage
        params={{
          tabId: PageTabs.USERS,
          subTabId: UserSubTabs.IDENTITY,
        }}
      />
    </LoadingWrapper>
  );
}

export default UsersSubPage;
