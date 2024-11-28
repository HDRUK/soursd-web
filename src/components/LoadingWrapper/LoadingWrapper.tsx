import theme from "@/theme";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

type LoadingWrapperProps = {
  loading: boolean;
  children: React.ReactNode;
};

export default function LoadingWrapper({
  loading,
  children,
}: LoadingWrapperProps) {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: `linear-gradient(90deg, ${theme.palette.background1.light} 0%, ${theme.palette.background1.extraLight} 35%, #fff 100%)`,
        }}>
        <h2>Loading...</h2>
        <CircularProgress />
      </Box>
    );
  }

  return children;
}
