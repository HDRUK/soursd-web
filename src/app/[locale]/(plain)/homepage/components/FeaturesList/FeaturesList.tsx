import { Check } from "@mui/icons-material";
import { List, ListItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface FeaturesListProps {
  features: {
    text: ReactNode;
  }[];
}

export default function FeaturesList({ features }: FeaturesListProps) {
  return (
    <List sx={{ mb: 5 }}>
      {features.map(({ text }) => (
        <ListItem sx={{ gap: 1 }} key={uuidv4()}>
          <Check color="secondary" />
          <Typography fontSize="1.25em" color={grey["400"]}>
            {text}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}
