import { Box } from "@mui/material";
import { ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
}

export default function FormActions({ children }: FormActionsProps) {
  return <Box sx={{ mt: 2 }}>{children}</Box>;
}
