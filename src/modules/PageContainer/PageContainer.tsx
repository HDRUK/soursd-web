import NavBar from "@/components/NavBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

interface PageContainerProps {
  children: ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
      <Header />
      <Box
        sx={{
          px: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}>
        {children}
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default PageContainer;
