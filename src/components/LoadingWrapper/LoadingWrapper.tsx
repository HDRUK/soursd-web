import theme from "@/theme";
import { Box, BoxProps, CircularProgress } from "@mui/material";
import React from "react";

type LoadingWrapperProps = {
  loading: boolean;
  children: React.ReactNode;
  variant: "rich" | "basic";
};

export default function LoadingWrapper({
  loading,
  children,
  variant = "rich",
}: LoadingWrapperProps) {
  let additionalProps: BoxProps["sx"] = {
    height: "100vh",
    background: `linear-gradient(90deg, ${theme.palette.background1.light} 0%, ${theme.palette.background1.extraLight} 35%, #fff 100%)`,
  };

  if (variant === "basic") {
    additionalProps = {
      py: 5,
    };
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ...additionalProps,
        }}>
        {variant === "rich" && <h2>Loading...</h2>}
        <CircularProgress />
      </Box>
    );
  }

  return children;
}
