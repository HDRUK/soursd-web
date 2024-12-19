"use client";

import { User } from "@/types/application";
import {
  ApprovedTrainingIcon,
  ApprovedUserIcon,
  IdentityVerifiedIcon,
} from "@/consts/icons";
import { Icon } from "@mui/material";

interface UserIconsProps {
  user: User;
  verified: boolean;
  isApproved: boolean;
}

export default function UserIcons({
  user,
  verified,
  isApproved,
}: UserIconsProps) {
  const shouldRenderIdentity = verified && user.user_group === "USERS";
  const shouldRenderApprovedUser = isApproved;
  const shouldRenderTraining = true; // TODO: Replace with proper logic

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
