import Text from "@/components/Text";
import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface LegendProps {
  items: {
    text: ReactNode;
    icon: ReactNode;
  }[];
  boxSx?: SxProps;
}

export default function Legend({ items, boxSx }: LegendProps) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", ...boxSx }}>
      {items.map(({ icon, text }) => (
        <Text iconSize="40px" startIcon={icon}>
          {text}
        </Text>
      ))}
    </Box>
  );
}
