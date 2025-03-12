import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default function FormControlDescription({
  children,
}: PropsWithChildren) {
  return (
    <Typography variant="subtitle2" sx={{ color: "textSecondary.main", pt: 1 }}>
      {children}
    </Typography>
  );
}
