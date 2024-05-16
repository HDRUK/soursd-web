import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import ImageDecorator from "../ImageDecorator";

interface FormHeaderProps {
  icon: ReactNode;
  children: ReactNode;
}

export default function FormHeader({ icon, children }: FormHeaderProps) {
  return (
    <>
      <Box sx={{ textAlign: "center", mb: 1 }}>
        <ImageDecorator>{icon}</ImageDecorator>
      </Box>
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        {children}
      </Typography>
    </>
  );
}
