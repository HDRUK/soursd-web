"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import SearchField from "../SearchField";

export interface SearchBarProps {
  onSearch: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  legend?: ReactNode;
  children?: ReactNode;
}

export default function SearchBar({
  placeholder,
  legend,
  onSearch,
  onClear,
  children,
}: SearchBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        flexGrow: 1,
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
          onSearch={(text: string) => {
            if (!text || text.length < 1) {
              onClear?.();
              return;
            }
            onSearch(text);
          }}
          onClear={onClear}
          placeholder={placeholder}
          sx={{ flexGrow: 1 }}
        />
        {children}
      </Box>
      {legend}
    </Box>
  );
}
