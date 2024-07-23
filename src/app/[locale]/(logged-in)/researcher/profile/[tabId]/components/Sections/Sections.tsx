"use client";

import Mask from "@/components/Mask";
import { useStore } from "@/data/store";
import { getInitialsFromUser } from "@/utils/user";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import ProfileCompleteStatus from "../ProfileCompleteStatus";

interface SectionsProps {
  children: ReactNode;
}

export default function Sections({ children }: SectionsProps) {
  const theme = useTheme();
  const getUser = useStore(state => state.getUser);
  const user = getUser();

  console.log("USER", user);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          gap: 2,
        },
      }}>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
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
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        }}
      />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
}
