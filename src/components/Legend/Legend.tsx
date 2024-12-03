import Text from "@/components/Text";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export interface LegendProps {
  items: {
    text: ReactNode;
    icon: ReactNode;
  }[];
}

export default function Legend({ items }: LegendProps) {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      {items.map(({ icon, text }) => (
        <Text iconSize="40px" startIcon={icon}>
          {text}
        </Text>
      ))}
    </Box>
  );
}
