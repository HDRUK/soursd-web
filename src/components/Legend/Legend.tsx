import Text from "@/components/Text";
import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

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
        <Text
          key={`legend_${uuidv4()}`}
          iconSize="40px"
          startIcon={icon}
          component="span">
          {text}
        </Text>
      ))}
    </Box>
  );
}
