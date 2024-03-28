"use client";

import { Box } from "@mui/material";
import FooterForm from "./FooterForm";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        gap: "100px",
        width: "100%",
      }}>
      <Box
        sx={{
          flexGrow: 1,
        }}>
        Links
      </Box>
      <FooterForm />
    </Box>
  );
}
