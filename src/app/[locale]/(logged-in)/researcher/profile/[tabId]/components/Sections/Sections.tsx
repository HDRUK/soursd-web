"use client";

import Mask from "@/components/Mask";
import { useStore } from "@/data/store";
import {
  PageColumnLayout,
  PageColumnLayoutLeft,
  PageColumnLayoutRight,
} from "@/modules/PageColumnLayout";
import { getInitialsFromUser } from "@/utils/user";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import ProfileCompleteStatus from "../ProfileCompleteStatus";

interface SectionsProps {
  children: ReactNode;
}

export default function Sections({ children }: SectionsProps) {
  const getUser = useStore(state => state.getUser);
  const user = getUser();

  return (
    <PageColumnLayout>
      <PageColumnLayoutLeft>
        <Mask width="160px" height="160px">
          {getInitialsFromUser(user)}
        </Mask>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography fontWeight="bold">
            {user?.last_name}, {user?.first_name}
          </Typography>
          <Typography sx={{ mb: 2 }}>{user?.email}</Typography>
          <ProfileCompleteStatus user={user} />
        </Box>
      </PageColumnLayoutLeft>
      <PageColumnLayoutRight>{children}</PageColumnLayoutRight>
    </PageColumnLayout>
  );
}
