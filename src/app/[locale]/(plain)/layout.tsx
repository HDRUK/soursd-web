import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {children}
    </Box>
  );
}
