import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PropsWithChildren } from "react";

export default function FormControlDescription({
  children,
}: PropsWithChildren) {
  return (
    <Typography variant="subtitle2" sx={{ color: grey["600"], pt: 1 }}>
      {children}
    </Typography>
  );
}
