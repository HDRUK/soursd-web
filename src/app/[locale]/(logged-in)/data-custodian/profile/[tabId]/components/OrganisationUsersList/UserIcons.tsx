"use client";

import { User } from "@/types/application";
import {
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
} from "@/consts/icons";
import { Icon } from "@mui/material";
import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import { getUser } from "@/services/users";

interface UserIconsProps {
  user: User;
  userId: number;
  verified: boolean;
  isApproved: boolean;
}

export default function UserIcons({
  user,
  userId,
  verified,
  isApproved,
}: UserIconsProps) {
  const { data: userInfo } = useQuery({
    queryKey: ["getUser", userId],
    queryFn: ({ queryKey }: QueryFunctionContext<QueryKey>) => {
      const [, id] = queryKey;

      return getUser(id as number, {
        error: {
          message: "getUserError",
        },
      });
    },
    enabled: !!userId,
  });

  const shouldRenderIdentity = verified && user.user_group === "USERS";
  const shouldRenderApprovedUser = isApproved;
  const shouldRenderTraining = userInfo?.data.registry.training;

  return (
    <>
      {shouldRenderIdentity ? (
        <IdentityVerifiedIcon fontSize="large" />
      ) : (
        <Icon fontSize="large" />
      )}
      {shouldRenderApprovedUser ? (
        <ApprovedUserIcon fontSize="large" />
      ) : (
        <Icon fontSize="large" />
      )}
      {shouldRenderTraining ? (
        <ApprovedTrainingIcon fontSize="large" />
      ) : (
        <Icon fontSize="large" />
      )}
    </>
  );
}
