"use client";

import { Box, Paper, useTheme } from "@mui/material";
import { ReactNode } from "react";
import DecoratorPanel from "../DecoratorPanel";
import Header from "../Header";
import Footer from "../Footer";

interface DecoratorPageProps {
  children: ReactNode;
}

function DecoratorPage({ children }: DecoratorPageProps) {
  const theme = useTheme();

  return (
    <DecoratorPanel>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
          minHeight: "100vh",
        }}>
        <Box>
          <Header />
        </Box>
        <Box
          sx={{ px: 1, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Paper
            sx={{
              width: "100%",
              m: "auto",
              flexGrow: 1,
              [theme.breakpoints.up("lg")]: {
                width: "1200px",
              },
            }}>
            {children}
          </Paper>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </DecoratorPanel>
  );
}

export default DecoratorPage;
