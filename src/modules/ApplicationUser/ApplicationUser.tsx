"use client";

import LoadingWrapper from "@/components/LoadingWrapper";
import { useStore } from "@/data/store";
import getMeQuery from "@/services/auth/getMeQuery";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

type ApplicationUserProps = PropsWithChildren;

export default function ApplicationUser({ children }: ApplicationUserProps) {
  const { data: user, isLoading } = useQuery(getMeQuery());
  const setUser = useStore(state => state.setUser);

  useEffect(() => {
    if (user?.data) {
      setUser(user.data);
    } else {
      setUser({});
    }
  }, [user?.data]);

  return (
    <LoadingWrapper loading={isLoading} variant="basic">
      {children}
    </LoadingWrapper>
  );
}
