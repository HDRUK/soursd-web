"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import SearchActionMenu, { Action } from "../SearchActionMenu";
import SearchField from "../SearchField";

export interface SearchBarProps {
  updateQueryParam: (text: string) => void;
  actions: Action[];
  placeholder: string;
  legend: ReactNode;
}

export default function SearchBar({
  actions,
  placeholder,
  legend,
  updateQueryParam,
}: SearchBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          flex: 1,
          maxHeight: 80,
        }}>
        <SearchField
          onSearch={(text: string) => updateQueryParam(text)}
          placeholder={placeholder}
        />
        <SearchActionMenu
          actions={actions}
          sx={{ justifySelf: "start", my: "auto" }}
        />
      </Box>
      {legend}
    </Box>
  );
}
