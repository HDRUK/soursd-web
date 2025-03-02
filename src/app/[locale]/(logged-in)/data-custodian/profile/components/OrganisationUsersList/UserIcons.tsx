"use client";

import {
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
} from "@/consts/icons";
import getUserQuery from "@/services/users/getUserQuery";
import { User } from "@/types/application";
import { Icon } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

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
  const { data: userInfo } = useQuery(
    getUserQuery(userId, {
      enabled: !!userId,
    })
  );

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
