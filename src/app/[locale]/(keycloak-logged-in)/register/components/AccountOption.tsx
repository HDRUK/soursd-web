"use client";

import React from "react";
import { Button, Typography } from "@mui/material";
import { AccountType } from "@/types/accounts";

interface AccountOptionProps {
  icon: React.ElementType;
  label: string;
  handleClick: (name: AccountType) => void;
  name: AccountType;
  selected: AccountType | null;
}

const AccountOption: React.FC<AccountOptionProps> = ({
  icon,
  label,
  handleClick,
  name,
  selected,
}) => {
  const Icon = icon;
  return (
    <Button
      variant={selected === name ? "contained" : "outlined"}
      onClick={() => handleClick(name)}
      sx={{
        borderRadius: 2,
        border: 2,
        py: 2,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        aspectRatio: 1,
        maxWidth: 200,
        minWidth: 100,
      }}>
      <Icon sx={{ fontSize: 72 }} />
      <Typography>{label}</Typography>
    </Button>
  );
};

export default AccountOption;
