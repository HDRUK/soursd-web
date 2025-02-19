"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import SearchField from "../SearchField";

export interface SearchBarProps {
  updateQueryParam: (text: string) => void;
  placeholder: string;
  legend: ReactNode;
  children: ReactNode;
}

export default function SearchBar({
  placeholder,
  legend,
  updateQueryParam,
  children,
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
          display: "flex",
          gap: 2,
          flexDirection: {
            md: "row",
            xs: "column",
          },
        }}>
        <SearchField
          onSearch={(text: string) => updateQueryParam(text)}
          placeholder={placeholder}
          sx={{ flexGrow: 1 }}
        />
        {children}
      </Box>
      {legend}
    </Box>
  );
}
