"use client";

import { useStore } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import LoadingWrapper from "../../components/LoadingWrapper";
import getMeQuery from "../../services/auth/getMeQuery";

type ApplicationUserProps = PropsWithChildren;

export default function ApplicationUser({ children }: ApplicationUserProps) {
  const { data: user, isLoading } = useQuery(getMeQuery());
  console.log("called get user", user);
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
